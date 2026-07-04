import { Link, useNavigate, useParams } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import { getProductById, products } from "../data/products";
import { useCart } from "../context/CartContext";
import "./ProductDetails.css";

export default function ProductDetails() {
  // useParams gives us the ":id" part from the route "/products/:id"
  const { id } = useParams();
  const navigate = useNavigate();
  const { isInCart, addToCart } = useCart();

  const product = getProductById(id);

  // if someone types a random/invalid id in the url, show a friendly message
  // instead of letting the app crash trying to read properties of "undefined"
  if (!product) {
    return (
      <DashboardLayout title="Product Details">
        <div className="empty-state">
          <p>Product not found.</p>
          <Link to="/products" className="btn btn-primary" style={{ marginTop: 14 }}>
            Back to Products
          </Link>
        </div>
      </DashboardLayout>
    );
  }

  const alreadyAdded = isInCart(product.id);
  const outOfStock = product.stock === 0;

  // "you may also like" - just showing 3 other random-ish products (excluding this one)
  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 3);

  function handleAddToCart() {
    if (!outOfStock && !alreadyAdded) {
      addToCart(product.id);
    }
  }

  return (
    <DashboardLayout title="Product Details" subtitle="Full information for the selected product">
      <div className="breadcrumb">
        <Link to="/products">Products</Link> <span>/</span> <span>{product.name}</span>
      </div>

      <div className="details-grid">
        <div className="details-image-card">
          <div className="details-image" style={{ background: product.color }}>
            <span>{product.icon}</span>
          </div>
        </div>

        <div className="details-info-card">
          <span className="product-category">{product.category}</span>
          <h1 className="details-title">{product.name}</h1>

          <div className="details-rating-row">
            <span>⭐ {product.rating}</span>
            <span className="dot">·</span>
            <span>{product.reviews} reviews</span>
            <span className={`badge ${outOfStock ? "danger" : "success"}`}>
              {outOfStock ? "Out of Stock" : "In Stock"}
            </span>
          </div>

          <h2 className="details-price">₹{product.price.toLocaleString("en-IN")}</h2>
          <p className="details-description">{product.description}</p>

          <div className="details-meta-grid">
            <div>
              <span className="meta-label">Availability</span>
              <p>{outOfStock ? "Out of stock" : `In Stock · ${product.stock} units`}</p>
            </div>
            <div>
              <span className="meta-label">Category</span>
              <p>{product.category}</p>
            </div>
            <div>
              <span className="meta-label">Rating</span>
              <p>{product.rating} / 5.0</p>
            </div>
          </div>

          <div className="details-actions">
            <button
              className="btn btn-primary"
              onClick={handleAddToCart}
              disabled={outOfStock || alreadyAdded}
            >
              {outOfStock ? "Unavailable" : alreadyAdded ? "Already in Cart" : "🛒 Add to Cart"}
            </button>
            <button className="btn btn-outline" onClick={() => navigate("/products")}>
              Back to Products
            </button>
          </div>
        </div>
      </div>

      <div className="related-section">
        <h2>You may also like</h2>
        <div className="related-grid">
          {relatedProducts.map((p) => (
            <Link key={p.id} to={`/products/${p.id}`} className="related-card">
              <div className="related-icon" style={{ background: p.color }}>
                {p.icon}
              </div>
              <div>
                <p className="related-name">{p.name}</p>
                <span className="related-price">₹{p.price.toLocaleString("en-IN")}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
