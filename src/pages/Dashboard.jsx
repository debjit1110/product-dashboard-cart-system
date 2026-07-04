import { useMemo } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import ProductCard from "../components/ProductCard";
import { products } from "../data/products";
import { useCart } from "../context/CartContext";
import { getOrders } from "../data/orders";
import "./Dashboard.css";

export default function Dashboard() {
  const { cartItems, totalItemsCount, total } = useCart();

  // useMemo here so we don't re-read localStorage on every single render,
  // only when the component mounts (orders list won't change while sitting on this page)
  const orders = useMemo(() => getOrders(), []);

  // just showing the first 4 products on the dashboard as a "preview"
  const previewProducts = products.slice(0, 4);

  // building a simple "recent activity" feed out of cart items + latest order
  // (not a real activity log, just something that looks realistic for the demo)
  const activity = [
    ...cartItems.slice(0, 2).map((item) => ({
      icon: "🛒",
      text: `${item.name} is in your cart`,
      time: "just now",
    })),
    ...(orders[0]
      ? [{ icon: "✅", text: `Order ${orders[0].id} placed`, time: "recently" }]
      : []),
  ];

  return (
    <DashboardLayout title="Dashboard" subtitle="Welcome back, here's your store overview">
      <div className="stats-grid">
        <StatCard icon="📦" label="Total Products" value={products.length} note="+2 new this week" />
        <StatCard icon="🛒" label="Cart Items" value={totalItemsCount} note="live count" />
        <StatCard
          icon="💳"
          label="Cart Value"
          value={`₹${total.toLocaleString("en-IN")}`}
          note="including tax"
        />
        <StatCard icon="🧾" label="Total Orders" value={orders.length} note="all time" />
      </div>

      <div className="dashboard-columns">
        <div className="dashboard-products-section">
          <div className="section-heading">
            <h2>Products</h2>
            <Link to="/products" className="see-all-link">See all →</Link>
          </div>
          <div className="products-grid">
            {previewProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        <div className="activity-section">
          <h2>Recent Activity</h2>
          {activity.length === 0 ? (
            <p className="empty-hint">No activity yet - add a product to your cart!</p>
          ) : (
            <ul className="activity-list">
              {activity.map((item, index) => (
                <li key={index}>
                  <span className="activity-icon">{item.icon}</span>
                  <div>
                    <p>{item.text}</p>
                    <span className="activity-time">{item.time}</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

// tiny reusable component just for the 4 stat cards at the top
function StatCard({ icon, label, value, note }) {
  return (
    <div className="stat-card">
      <div className="stat-icon">{icon}</div>
      <p className="stat-label">{label}</p>
      <h3 className="stat-value">{value}</h3>
      <span className="stat-note">{note}</span>
    </div>
  );
}
