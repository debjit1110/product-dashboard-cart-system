import { NavLink } from "react-router-dom";
import "./Sidebar.css";

// simple array of menu items - makes it easy to add/remove a link later
// instead of writing the same <NavLink> markup 5 times
const menuItems = [
  { to: "/dashboard", label: "Dashboard", icon: "🏠" },
  { to: "/products", label: "Products", icon: "📦" },
  { to: "/cart", label: "Cart", icon: "🛒" },
  { to: "/orders", label: "Orders", icon: "🧾" },
  { to: "/profile", label: "Profile", icon: "👤" },
];

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {/* dark overlay only shows on mobile when sidebar is open, clicking it closes the sidebar */}
      {open && <div className="sidebar-overlay" onClick={onClose}></div>}

      <aside className={`sidebar ${open ? "sidebar-open" : ""}`}>
        <div className="sidebar-logo">
          <div className="logo-box">C</div>
          <div>
            <div className="logo-text">CartNest</div>
            <div className="logo-sub">Store Dashboard</div>
          </div>
        </div>

        <nav className="sidebar-menu">
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) => "sidebar-link" + (isActive ? " active" : "")}
            >
              <span className="sidebar-icon">{item.icon}</span>
              {item.label}
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
