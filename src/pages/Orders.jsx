import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { getOrders } from "../data/orders";
import "./Orders.css";

export default function Orders() {
  const navigate = useNavigate();
  // reading straight from localStorage as initial state - orders don't change while user
  // is browsing other tabs, so we don't need useEffect for this simple case
  const [orders] = useState(() => getOrders());
  const [selectedOrder, setSelectedOrder] = useState(null); // for the "view details" popup
  const [filter, setFilter] = useState("All");

  const filteredOrders =
    filter === "All" ? orders : orders.filter((o) => o.status === filter);

  const deliveredCount = orders.filter((o) => o.status === "Delivered").length;
  const processingCount = orders.filter((o) => o.status === "Processing").length;

  function statusClass(status) {
    if (status === "Delivered") return "success";
    if (status === "Processing") return "warning";
    if (status === "Cancelled") return "danger";
    return "info";
  }

  if (orders.length === 0) {
    return (
      <DashboardLayout title="Orders" subtitle="Track and manage all placed orders">
        <div className="empty-state">
          <p style={{ fontSize: 40, marginBottom: 10 }}>🧾</p>
          <p>No orders placed yet.</p>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate("/products")}>
            Start Shopping
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Orders" subtitle="Track and manage all placed orders">
      <div className="stats-grid orders-stats">
        <div className="stat-card">
          <p className="stat-label">Total Orders</p>
          <h3 className="stat-value">{orders.length}</h3>
        </div>
        <div className="stat-card">
          <p className="stat-label">Delivered</p>
          <h3 className="stat-value">{deliveredCount}</h3>
        </div>
        <div className="stat-card">
          <p className="stat-label">Processing</p>
          <h3 className="stat-value">{processingCount}</h3>
        </div>
      </div>

      <div className="orders-card">
        <div className="orders-card-head">
          <h2>All Orders</h2>
          <div className="orders-filter-pills">
            {["All", "Delivered", "Processing", "Cancelled"].map((status) => (
              <button
                key={status}
                className={`pill ${filter === status ? "pill-active" : ""}`}
                onClick={() => setFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="orders-table-head">
          <span>Order ID</span>
          <span>Customer</span>
          <span>Date</span>
          <span>Total</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {filteredOrders.map((order) => (
          <div className="orders-row" key={order.id}>
            <span className="order-id">{order.id}</span>
            <span className="order-customer">{order.customerName}</span>
            <span>{order.date}</span>
            <span className="order-total">₹{order.total.toLocaleString("en-IN")}</span>
            <span className={`badge ${statusClass(order.status)}`}>{order.status}</span>
            <button className="btn btn-outline small-btn" onClick={() => setSelectedOrder(order)}>
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* simple details modal - only rendered when an order is selected */}
      {selectedOrder && (
        <div className="modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>{selectedOrder.id}</h3>
              <button onClick={() => setSelectedOrder(null)}>✕</button>
            </div>
            <p className="modal-sub">
              {selectedOrder.customerName} · {selectedOrder.date}
            </p>

            <div className="modal-items">
              {selectedOrder.items.map((item) => (
                <div className="modal-item-row" key={item.id}>
                  <span>{item.icon} {item.name} × {item.qty}</span>
                  <span>₹{item.subtotal.toLocaleString("en-IN")}</span>
                </div>
              ))}
            </div>

            <div className="modal-total-row">
              <span>Total Paid</span>
              <span>₹{selectedOrder.total.toLocaleString("en-IN")}</span>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
