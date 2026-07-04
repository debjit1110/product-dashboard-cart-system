// keeping order related localStorage logic in one file
// so Checkout.jsx and Orders.jsx both use the exact same format

const ORDERS_KEY = "cartnest_orders";

export function getOrders() {
  const raw = localStorage.getItem(ORDERS_KEY);
  return raw ? JSON.parse(raw) : [];
}

export function saveOrder(order) {
  const orders = getOrders();
  // adding new order to the top of the list so the newest one shows first
  const updated = [order, ...orders];
  localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  return updated;
}

// generates a simple order id like #ORD-1042
// (not a real backend id, just something that looks realistic for this test)
export function generateOrderId() {
  const orders = getOrders();
  const nextNumber = 1040 + orders.length + 1;
  return `#ORD-${nextNumber}`;
}
