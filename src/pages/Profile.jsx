import DashboardLayout from "../layouts/DashboardLayout";
import { useAuth } from "../context/AuthContext";
import "./Profile.css";

// this page is not part of the original requirement list, but the sidebar
// had a "Profile" link, so I made a small page for it instead of leaving it broken
export default function Profile() {
  const { user } = useAuth();

  const initials = user?.name
    ? user.name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <DashboardLayout title="Profile" subtitle="Your account information">
      <div className="profile-card">
        <div className="profile-avatar">{initials}</div>
        <h2>{user?.name || "Guest User"}</h2>
        <p className="profile-email">{user?.email}</p>
        <span className="badge success">Admin Account</span>
      </div>
    </DashboardLayout>
  );
}
