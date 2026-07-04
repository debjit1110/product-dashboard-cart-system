import { Link, useNavigate } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { useCart } from "../context/CartContext";
import "./Cart.css";

export default function Cart() {
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    subtotal,
    discount,
    tax,
    total,
    discountPercent,
    taxPercent,
  } = useCart();

  const navigate = useNavigate();

  // empty cart gets its own simple screen instead of showing an empty table
  if (cartItems.length === 0) {
    return (
      <DashboardLayout title="Your Cart" subtitle="Review items before checkout">
        <div className="empty-state">
          <p style={{ fontSize: 40, marginBottom: 10 }}>🛒</p>
          <p>Your cart is empty.</p>
          <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate("/products")}>
            Continue Shopping
          </button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout title="Your Cart" subtitle="Review items before checkout">
      <div className="cart-layout">
        <div className="cart-items-card">
          <div className="cart-items-header">
            <h2>Cart Items ({cartItems.length})</h2>
            <button className="btn btn-outline small-btn" onClick={clearCart}>
              Clear all
            </button>
          </div>

          <div className="cart-table-head">
            <span>Product</span>
            <span>Quantity</span>
            <span>Subtotal</span>
            <span></span>
          </div>

          {cartItems.map((item) => (
            <div className="cart-row" key={item.id}>
              <div className="cart-product">
                <div className="cart-thumb" style={{ background: item.color }}>
                  {item.icon}
                </div>
                <div>
                  <p className="cart-product-name">{item.name}</p>
                  <span className="cart-product-cat">{item.category}</span>
                  <p className="cart-product-price">₹{item.price.toLocaleString("en-IN")}</p>
                </div>
              </div>

              <div className="qty-control">
                <button onClick={() => decreaseQty(item.id)}>-</button>
                <span>{item.qty}</span>
                <button onClick={() => increaseQty(item.id)}>+</button>
              </div>

              <div className="cart-subtotal">₹{item.subtotal.toLocaleString("en-IN")}</div>

              <button className="remove-btn" onClick={() => removeFromCart(item.id)} title="Remove item">
                🗑️
              </button>
            </div>
          ))}

          <Link to="/products" className="continue-link">
            ← Continue Shopping
          </Link>
        </div>

        <div className="order-summary-card">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>
          <div className="summary-row">
            <span>Discount ({discountPercent}%)</span>
            <span className="discount-text">- ₹{discount.toLocaleString("en-IN")}</span>
          </div>
          <div className="summary-row">
            <span>Tax ({taxPercent}% GST)</span>
            <span>₹{tax.toLocaleString("en-IN")}</span>
          </div>

          <div className="summary-total">
            <span>Total</span>
            <span>₹{total.toLocaleString("en-IN")}</span>
          </div>

          <button className="btn btn-primary btn-block" onClick={() => navigate("/checkout")}>
            ✓ Proceed to Checkout
          </button>
          <p className="secure-note">🔒 Secure checkout · SSL encrypted</p>
        </div>
      </div>
    </DashboardLayout>
  );
}
