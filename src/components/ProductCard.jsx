import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./ProductCard.css";

export default function ProductCard({ product }) {
  const { isInCart, addToCart } = useCart();
  const navigate = useNavigate();

  const alreadyAdded = isInCart(product.id);
  const outOfStock = product.stock === 0;

  // Compute the stock state visually and textually
  const stockBadge = useMemo(() => {
    if (outOfStock) return { text: "Out of Stock", className: "danger" };
    if (product.stock <= 5) return { text: "Low Stock", className: "warning" };
    return { text: "In Stock", className: "success" };
  }, [product.stock, outOfStock]);

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const handleAddClick = (e) => {
    e.stopPropagation(); // Prevents clicking the button from firing handleCardClick
    if (!outOfStock && !alreadyAdded) {
      addToCart(product.id);
    }
  };

  return (
    <div 
      className="product-card" 
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
    >
      <div className="product-thumb" style={{ background: product.color }}>
        <span aria-hidden="true">{product.icon}</span>
      </div>

      <div className="product-body">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>

        <div className="product-meta">
          <span className="product-rating" aria-label={`Rating: ${product.rating} stars`}>
            ⭐ {product.rating}
          </span>
          <span className={`badge ${stockBadge.className}`}>
            {stockBadge.text}
          </span>
        </div>

        <div className="product-footer">
          <span className="product-price">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <button
            className={`btn ${alreadyAdded ? "btn-outline" : "btn-primary"} add-btn`}
            onClick={handleAddClick}
            disabled={outOfStock || alreadyAdded}
          >
            {outOfStock ? "Unavailable" : alreadyAdded ? "✓ Added" : "+ Add"}
          </button>
        </div>
      </div>
    </div>
  );
}