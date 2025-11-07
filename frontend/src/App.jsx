import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Products from "./pages/Products";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import { useCartStore } from "./store/cartStore";

function App() {
  const { cart } = useCartStore();

  return (
    <BrowserRouter>
      <div className="p-6 max-w-5xl mx-auto">
        {/* Navbar */}
        <nav className="flex justify-between bg-black/70 text-white p-4 rounded-lg mb-6">
          <Link to="/" className="text-xl font-bold">🛍 Vibe Commerce</Link>
          <Link to="/cart" className="text-xl font-bold">
            🛒 Cart ({cart?.items?.length || 0})
          </Link>
        </nav>

        {/* Pages */}
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>

        {/* Checkout always visible on bottom */}

      </div>
    </BrowserRouter>
  );
}

export default App;
