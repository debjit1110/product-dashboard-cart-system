import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

export default function Header({ title, subtitle, onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  /**
   * Generates a 2-letter uppercase string from the user's name.
   * Example: "Sabyasachi Saha" -> "SS"
   */
  const initials = useMemo(() => {
    if (!user?.name) return "U";
    
    return user.name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }, [user?.name]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button 
          className="hamburger-btn" 
          onClick={onMenuClick}
          aria-label="Open sidebar menu"
        >
          ☰
        </button>
        <div>
          <h1 className="page-title">{title}</h1>
          {subtitle && <p className="page-subtitle">{subtitle}</p>}
        </div>
      </div>

      <div className="topbar-right">
        <input
          className="topbar-search"
          type="text"
          placeholder="Search products, orders..."
          aria-label="Search site content"
        />
        
        <button className="icon-btn" title="Notifications" aria-label="Notifications">
          🔔
        </button>

        <div className="topbar-user">
          <div className="user-info">
            <span className="user-name">{user?.name || "Guest"}</span>
            <span className="user-role">User</span>
          </div>
          <div className="user-avatar" aria-hidden="true">
            {initials}
          </div>
        </div>

        <button className="btn btn-outline logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}