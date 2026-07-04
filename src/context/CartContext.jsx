import { createContext, useContext, useEffect, useState } from "react";
import { products } from "../data/products";

const CartContext = createContext();

const CART_KEY = "cartnest_cart";

// discount and tax are fixed percentages for this project (not coming from any API)
const DISCOUNT_PERCENT = 10;
const TAX_PERCENT = 18;

export function CartProvider({ children }) {
  // cartItems is an array like [{ productId: 1, qty: 2 }, { productId: 3, qty: 1 }]
  // I am only storing the id + qty, and looking up the rest of the product info
  // from products.js whenever I need it - this way the cart data stays small
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem(CART_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  // every time cartItems changes, save it back to localStorage
  // so the cart is not lost on page refresh
  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
  }, [cartItems]);

  function isInCart(productId) {
    return cartItems.some((item) => item.productId === productId);
  }

  function addToCart(productId) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === productId);
      if (existing) {
        // already in cart, so just bump the quantity by 1 instead of duplicating the row
        return prev.map((item) =>
          item.productId === productId ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { productId, qty: 1 }];
    });
  }

  function removeFromCart(productId) {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId));
  }

  function increaseQty(productId) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId ? { ...item, qty: item.qty + 1 } : item
      )
    );
  }

  function decreaseQty(productId) {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.productId !== productId) return item;
        // quantity should never go below 1, if user wants 0 they should use remove button
        const newQty = item.qty > 1 ? item.qty - 1 : 1;
        return { ...item, qty: newQty };
      })
    );
  }

  function clearCart() {
    setCartItems([]);
  }

  // combine cartItems (id + qty) with full product details, so pages don't have to do the lookup themselves
  const detailedCartItems = cartItems
    .map((item) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) return null; // just in case product was removed from products.js
      return { ...product, qty: item.qty, subtotal: product.price * item.qty };
    })
    .filter(Boolean);

  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  // ---- price calculations ----
  // subtotal = sum of (price * qty) for every item in the cart
  const subtotal = detailedCartItems.reduce((sum, item) => sum + item.subtotal, 0);
  const discount = Math.round((subtotal * DISCOUNT_PERCENT) / 100);
  const taxableAmount = subtotal - discount;
  const tax = Math.round((taxableAmount * TAX_PERCENT) / 100);
  const total = taxableAmount + tax;

  const value = {
    cartItems: detailedCartItems,
    totalItemsCount,
    isInCart,
    addToCart,
    removeFromCart,
    increaseQty,
    decreaseQty,
    clearCart,
    subtotal,
    discount,
    tax,
    total,
    discountPercent: DISCOUNT_PERCENT,
    taxPercent: TAX_PERCENT,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  return useContext(CartContext);
}
