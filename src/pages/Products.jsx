import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import ProductCard from "../components/ProductCard";
import { products as allProducts } from "../data/products";
import "./Products.css";

// building the category list dynamically from the product data
// instead of hardcoding it, so if a new category is added to products.js
// this list updates automatically
const categories = ["All", ...new Set(allProducts.map((p) => p.category))];

export default function Products() {
  // ---- these 3 states control the search/filter/sort ----
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("none"); // "none" | "low-high" | "high-low"

  // the task says to "fetch products from a dummy API", so I am faking that here
  // with a small setTimeout just to show a loading spinner for a moment
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(allProducts);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer); // cleanup in case component unmounts early
  }, []);

  // running the search + filter + sort together every render
  // order matters here: first filter down the list, then sort what's left
  let visibleProducts = products
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((p) => selectedCategory === "All" || p.category === selectedCategory);

  if (sortOrder === "low-high") {
    // making a copy with [...array] before sort() because sort() mutates the original array
    visibleProducts = [...visibleProducts].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-low") {
    visibleProducts = [...visibleProducts].sort((a, b) => b.price - a.price);
  }

  return (
    <DashboardLayout title="Products" subtitle="Browse, search and filter the full catalog">
      <div className="products-toolbar">
        <input
          className="field-input search-input"
          type="text"
          placeholder="Search products by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="field-input toolbar-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat === "All" ? "All Categories" : cat}
            </option>
          ))}
        </select>

        <select
          className="field-input toolbar-select"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="none">Sort: Default</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
        </select>
      </div>

      <div className="category-pills">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`pill ${selectedCategory === cat ? "pill-active" : ""}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="loading-text">Loading products...</p>
      ) : visibleProducts.length === 0 ? (
        <div className="empty-state">
          <p>No products found.</p>
        </div>
      ) : (
        <div className="products-grid-full">
          {visibleProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}
