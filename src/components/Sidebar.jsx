import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const MENU_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: "🏠" },
  { to: "/products", label: "Products", icon: "📦" },
  { to: "/cart", label: "Cart", icon: "🛒" },
  { to: "/orders", label: "Orders", icon: "🧾" },
  { to: "/profile", label: "Profile", icon: "👤" },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && (
        <div 
          className="sidebar-overlay" 
          onClick={onClose} 
          role="presentation"
        />
      )}

      <aside className={`sidebar ${open ? "sidebar-open" : ""}`} aria-hidden={!open}>
        <div className="sidebar-logo">
          <div className="logo-box" aria-hidden="true">C</div>
          <div>
            <div className="logo-text">CartNest</div>
            <div className="logo-sub">Store Dashboard</div>
          </div>
        </div>

        <nav className="sidebar-menu">
          {MENU_ITEMS.map(({ to, label, icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) => 
                `sidebar-link ${isActive ? "active" : ""}`.trim()
              }
            >
              <span className="sidebar-icon" aria-hidden="true">
                {icon}
              </span>
              <span className="sidebar-label">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-promo">
          <h4>Go Pro</h4>
          <p>Unlock analytics & bulk order tools.</p>
          <button className="btn btn-outline btn-block">Upgrade Plan</button>
        </div>
      </aside>
    </>
  );
}