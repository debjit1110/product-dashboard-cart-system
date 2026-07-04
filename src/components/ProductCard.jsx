import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { isInCart, addToCart } = useCart();
  const alreadyAdded = isInCart(product.id);
  const outOfStock = product.stock === 0;

  // deciding which stock badge to show - in stock / low stock / out of stock
  let stockBadge = { text: "In Stock", className: "success" };
  if (outOfStock) {
    stockBadge = { text: "Out of Stock", className: "danger" };
  } else if (product.stock <= 5) {
    stockBadge = { text: "Low Stock", className: "warning" };
  }

  function handleAddClick(e) {
    e.preventDefault(); // stop the click from also triggering the <Link> navigation
    if (!outOfStock && !alreadyAdded) {
      addToCart(product.id);
    }
  }

  return (
    <Link to={`/products/${product.id}`} className="product-card">
      <div className="product-thumb" style={{ background: product.color }}>
        <span>{product.icon}</span>
      </div>

      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>

        <div className="product-meta">
          <span className="product-rating">⭐ {product.rating}</span>
          <span className={`badge ${stockBadge.className}`}>{stockBadge.text}</span>
        </div>

        <div className="product-footer">
          <span className="product-price">₹{product.price.toLocaleString("en-IN")}</span>

          <button
            className={`btn ${alreadyAdded ? "btn-outline" : "btn-primary"} add-btn`}
            onClick={handleAddClick}
            disabled={outOfStock || alreadyAdded}
          >
            {outOfStock ? "Unavailable" : alreadyAdded ? "✓ Added" : "+ Add"}
          </button>
        </div>
      </div>
    </Link>
  );
}
