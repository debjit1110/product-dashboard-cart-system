const ACTIVITY_KEY = "cartnest_activity";

/**
 * Fetches the list of activities from localStorage.
 * Returns an empty array if no activities exist yet.
 */
export function getActivity() {
  const saved = localStorage.getItem(ACTIVITY_KEY);
  return saved ? JSON.parse(saved) : [];
}

/**
 * Adds a new activity log entry to the top of the list.
 * @param {string} icon - Emoji representing the action (e.g., "🛒", "❌", "✅")
 * @param {string} text - Description of the activity
 */
export function addActivity(icon, text) {
  const currentActivities = getActivity();

  // Create a user-friendly timestamp (e.g., "Just now" or formatted time)
  const formattedTime = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });

  const newActivity = {
    icon,
    text,
    time: formattedTime,
  };

  // Prepend so latest activities appear at the top
  const updatedActivities = [newActivity, ...currentActivities];

  // Optional: Cap the list at a reasonable number (e.g., 20) so localStorage doesn't bloat
  const limitedActivities = updatedActivities.slice(0, 20);

  localStorage.setItem(ACTIVITY_KEY, JSON.stringify(limitedActivities));
}