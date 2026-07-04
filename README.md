# CartNest – Product Dashboard + Cart System

A small React (Vite) project I built for the machine test: login/register, a
dashboard, product listing with search/filter/sort, product details, cart,
checkout and an orders page. All data (products, users, cart, orders) is kept
in the browser using `localStorage` — there is no real backend.

## Tech used

- React 19 + Vite
- React Router v6 (client side routing)
- Plain CSS (no UI library) — variables kept in `src/index.css`
- React Context API for auth + cart state (no redux, felt like overkill for this size)

## Folder structure

```
src/
  components/     -> small reusable pieces (Sidebar, Header, ProductCard, ProtectedRoute)
  context/        -> AuthContext + CartContext (global state)
  data/           -> dummy products.js + localStorage helpers for orders.js
  layouts/        -> DashboardLayout (sidebar + topbar wrapper for logged-in pages)
  pages/          -> one file per screen (Login, Register, Dashboard, Products, ...)
```

## How to run

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To create a production build:

```bash
npm run build
npm run preview
```

## How login works (important!)

There is no real server, so:

1. **Register** saves your name/email/password into `localStorage` under `cartnest_users`.
2. **Login** checks the email + password against that saved list.
3. There's also a **"Continue as Guest"** button on the login page if you just
   want to jump straight into the dashboard without creating an account.

## Notes / things I'd improve with more time

- Real API calls instead of a local array (`src/data/products.js`)
- Better password handling (right now it's just plain text in localStorage,
  which is fine for a demo but not something I'd do for a real product)
- Unit tests for the cart math (discount/tax calculation)
- Image upload for products instead of emoji icons
