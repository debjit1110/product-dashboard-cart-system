import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import "./DashboardLayout.css";

// this is a "layout" component - it wraps around every logged-in page
// so I don't have to repeat the sidebar + header code on every single page
export default function DashboardLayout({ title, subtitle, children }) {
  // controls whether sidebar is visible on mobile (it's an off-canvas drawer there)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar open={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
      <div className="dashboard-main">
        <Header
          title={title}
          subtitle={subtitle}
          onMenuClick={() => setMobileMenuOpen(true)}
        />
        <div className="dashboard-content">{children}</div>
      </div>
    </div>
  );
}
