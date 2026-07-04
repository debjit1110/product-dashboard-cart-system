import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// wrap this around any page that should only be visible after login
// example usage: <ProtectedRoute><Dashboard /></ProtectedRoute>
export default function ProtectedRoute({ children }) {
  const { isLoggedIn, loading } = useAuth();

  // while we are still checking localStorage for a saved session, don't redirect yet
  // otherwise it will flash the login page for a split second even when user is logged in
  if (loading) {
    return null;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
