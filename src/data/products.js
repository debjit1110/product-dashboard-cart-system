// I did not have a real backend/API for this test, so I am just keeping
// all the product data in this file as a plain JS array.
// Every product needs an "icon" (emoji) instead of a real image because
// we don't have actual image files - it still looks fine on the card.

export const products = [
  {
    id: 1,
    name: "Wireless Headphone",
    category: "Electronics",
    price: 2500,
    rating: 4.5,
    reviews: 214,
    stock: 12,
    icon: "🎧",
    color: "linear-gradient(135deg, #0d9488, #2dd4bf)",
    description:
      "Premium over-ear wireless headphone with active noise cancellation, 30-hour battery life, and soft memory-foam ear cushions for all day comfort.",
  },
  {
    id: 2,
    name: "Running Shoes",
    category: "Fashion",
    price: 3200,
    rating: 4.2,
    reviews: 98,
    stock: 8,
    icon: "👟",
    color: "linear-gradient(135deg, #f59e0b, #f97316)",
    description:
      "Lightweight running shoes with breathable mesh upper and cushioned sole, built for daily workouts and long runs.",
  },
  {
    id: 3,
    name: "Smart Watch",
    category: "Electronics",
    price: 5900,
    rating: 4.7,
    reviews: 156,
    stock: 3,
    icon: "⌚",
    color: "linear-gradient(135deg, #2563eb, #38bdf8)",
    description:
      "Track your steps, heart rate and sleep with this smart watch. Comes with a 7 day battery backup and AMOLED display.",
  },
  {
    id: 4,
    name: "Leather Backpack",
    category: "Accessories",
    price: 1850,
    rating: 4.4,
    reviews: 74,
    stock: 20,
    icon: "🎒",
    color: "linear-gradient(135deg, #e11d48, #fb7185)",
    description:
      "Genuine leather backpack with padded laptop compartment, perfect for college or daily office use.",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    category: "Electronics",
    price: 2100,
    rating: 4.3,
    reviews: 112,
    stock: 15,
    icon: "🔊",
    color: "linear-gradient(135deg, #7c3aed, #a78bfa)",
    description:
      "Portable bluetooth speaker with deep bass, IPX7 waterproof body and 12 hours of playtime.",
  },
  {
    id: 6,
    name: "Denim Jacket",
    category: "Fashion",
    price: 2750,
    rating: 4.1,
    reviews: 41,
    stock: 0,
    icon: "🧥",
    color: "linear-gradient(135deg, #0891b2, #22d3ee)",
    description:
      "Classic denim jacket with a relaxed fit, works well as a light layer in every season.",
  },
  {
    id: 7,
    name: "Sunglasses",
    category: "Accessories",
    price: 990,
    rating: 4.0,
    reviews: 63,
    stock: 30,
    icon: "🕶️",
    color: "linear-gradient(135deg, #ca8a04, #facc15)",
    description:
      "UV protected polarized sunglasses with a light weight frame, comes with a free hard case.",
  },
  {
    id: 8,
    name: "Fitness Tracker",
    category: "Electronics",
    price: 1600,
    rating: 4.6,
    reviews: 88,
    stock: 18,
    icon: "📟",
    color: "linear-gradient(135deg, #059669, #34d399)",
    description:
      "Budget friendly fitness band that tracks steps, calories and sleep, with 10 day battery life.",
  },
];

// small helper - find one product by id (id comes as string from the URL params)
export function getProductById(id) {
  return products.find((p) => p.id === Number(id));
}
