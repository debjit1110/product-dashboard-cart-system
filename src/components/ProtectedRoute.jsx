import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Route guard component to restrict unauthorized access to authenticated pages.
 * Handles loading fallback states to prevent layout flash during session hydration.
 */
export default function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="loading-spinner-container" aria-live="polite">
        {/* A simple pure-CSS loader or minimal spinner component belongs here */}
        <div className="spinner" />
      </div>
    );
  }

  if (!isLoggedIn) {
    // Redirect to login, but preserve the current location history
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}