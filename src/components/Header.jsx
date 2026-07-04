import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Header.css";

export default function Header({ title, subtitle, onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // just taking the first letters of the name to show inside the round avatar
  // example: "Sabyasachi Saha" -> "SS"
  const initials = user?.name
    ? user.name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase()
    : "U";

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="topbar">
      <div className="topbar-left">
        {/* hamburger button only visible on mobile to open the sidebar */}
        <button className="hamburger-btn" onClick={onMenuClick}>
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
        />
        <button className="icon-btn" title="Notifications">🔔</button>
        <div className="topbar-user">
          <div className="user-info">
            <span className="user-name">{user?.name || "Guest"}</span>
            <span className="user-role">Admin</span>
          </div>
          <div className="user-avatar">{initials}</div>
        </div>
        <button className="btn btn-outline logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
