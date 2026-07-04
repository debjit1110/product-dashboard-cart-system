import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { saveOrder, generateOrderId } from "../data/orders";
import { addActivity } from "../data/activity";
import "./Checkout.css";

export default function Checkout() {
  const { cartItems, subtotal, discount, tax, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    paymentMethod: "card",
  });
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false); // controls the success screen

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function validate() {
    const newErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required.";

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address.";
    }

    // phone should only have digits, 10 of them (basic indian mobile number check)
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Phone must be a 10 digit number.";
    }

    if (!formData.address.trim()) newErrors.address = "Address is required.";
    if (!formData.city.trim()) newErrors.city = "City is required.";

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required.";
    } else if (!/^\d+$/.test(formData.pincode)) {
      newErrors.pincode = "Pincode must be numeric.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handlePlaceOrder(e) {
    e.preventDefault();
    if (cartItems.length === 0) return;
    if (!validate()) return;

    setPlacing(true);

    // building the order object that gets saved to localStorage
    const order = {
      id: generateOrderId(),
      customerName: formData.fullName,
      date: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      items: cartItems,
      subtotal,
      discount,
      tax,
      total,
      paymentMethod: formData.paymentMethod,
      status: "Processing",
    };

    saveOrder(order);
    addActivity("✅", `Order ${order.id} placed`);

    // show a proper "success" screen first instead of jumping straight to Orders -
    // the task specifically asks for a success state, not just a silent redirect
    setTimeout(() => {
      setPlacing(false);
      setOrderPlaced(true);
      clearCart();
    }, 700);
  }

  // ---- success screen shown right after the order is placed ----
  if (orderPlaced) {
    return (
      <DashboardLayout title="Checkout">
        <div className="success-state">
          <div className="success-icon">✅</div>
          <h2>Order placed successfully!</h2>
          <p>Your order has been confirmed and saved to your order history.</p>
          <div className="success-actions">
            <button className="btn btn-primary" onClick={() => navigate("/orders")}>
              View Orders
            </button>
            <button className="btn btn-outline" onClick={() => navigate("/dashboard")}>
              Back to Dashboard
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (cartItems.length === 0) {
    return (
      <DashboardLayout title="Checkout" subtitle="Enter your details to place the order">
        <div className="empty-state">
          <p>Your cart is empty, add something before checking out.</p>
          <button className="btn btn-primary" style={{ marginTop: 14 }} onClick={() => navigate("/products")}>
            Browse Products
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Checkout" subtitle="Enter your details to place the order">
      <form className="checkout-layout" onSubmit={handlePlaceOrder} noValidate>
        <div className="checkout-form-card">
          <h2>Customer Information</h2>

          <div className="field-group">
            <label className="field-label">Full Name</label>
            <input
              className={`field-input ${errors.fullName ? "error" : ""}`}
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Your full name"
            />
            {errors.fullName && <p className="field-error">{errors.fullName}</p>}
          </div>

          <div className="two-col">
            <div className="field-group">
              <label className="field-label">Email</label>
              <input
                className={`field-input ${errors.email ? "error" : ""}`}
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@cartnest.com"
              />
              {errors.email && <p className="field-error">{errors.email}</p>}
            </div>
            <div className="field-group">
              <label className="field-label">Phone</label>
              <input
                className={`field-input ${errors.phone ? "error" : ""}`}
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="9876543210"
              />
              {errors.phone && <p className="field-error">{errors.phone}</p>}
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">Address</label>
            <input
              className={`field-input ${errors.address ? "error" : ""}`}
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Flat 4B, 22 Park Street"
            />
            {errors.address && <p className="field-error">{errors.address}</p>}
          </div>

          <div className="two-col">
            <div className="field-group">
              <label className="field-label">City</label>
              <input
                className={`field-input ${errors.city ? "error" : ""}`}
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Kolkata"
              />
              {errors.city && <p className="field-error">{errors.city}</p>}
            </div>
            <div className="field-group">
              <label className="field-label">Pincode</label>
              <input
                className={`field-input ${errors.pincode ? "error" : ""}`}
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="713201"
              />
              {errors.pincode && <p className="field-error">{errors.pincode}</p>}
            </div>
          </div>

          <h2 style={{ marginTop: 10 }}>Payment Method</h2>
          <div className="payment-options">
            {["card", "upi", "cod"].map((method) => (
              <label
                key={method}
                className={`payment-option ${formData.paymentMethod === method ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  value={method}
                  checked={formData.paymentMethod === method}
                  onChange={handleChange}
                />
                {method === "card" && "💳 Card"}
                {method === "upi" && "📱 UPI"}
                {method === "cod" && "💵 Cash on Delivery"}
              </label>
            ))}
          </div>
        </div>

        <div className="order-summary-card">
          <h2>Order Summary</h2>
          {cartItems.map((item) => (
            <div className="summary-item" key={item.id}>
              <div className="summary-item-thumb" style={{ background: item.color }}>
                {item.qty}
                <span className="summary-thumb-icon">{item.icon}</span>
              </div>
              <div className="summary-item-info">
                <p>{item.name}</p>
                <span>{item.category}</span>
              </div>
              <span className="summary-item-price">₹{item.subtotal.toLocaleString("en-IN")}</span>
            </div>
          ))}

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="summary-row">
            <span>Discount</span>
            <span className="discount-text">- ₹{discount.toLocaleString("en-IN")}</span>
          </div>
          <div className="summary-row">
            <span>Tax</span>
            <span>₹{tax.toLocaleString("en-IN")}</span>
          </div>
          <div className="summary-total">
            <span>Total</span>
            <span>₹{total.toLocaleString("en-IN")}</span>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled={placing}>
            {placing ? "Placing order..." : "✓ Place Order"}
          </button>
          <button
            type="button"
            className="btn btn-outline btn-block"
            style={{ marginTop: 10 }}
            onClick={() => navigate("/cart")}
          >
            Back to Cart
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}