import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

const BASE = "http://localhost:3000/api";

export const useCartStore = create(
  persist(
    (set, get) => ({
      products: [],
      cart: { items: [], total: 0 },

      // Fetch products
      fetchProducts: async () => {
        const res = await fetch(`${BASE}/products`);
        const data = await res.json();
        set({ products: data });
      },

      // Fetch cart
      fetchCart: async () => {
        const res = await fetch(`${BASE}/cart`);
        const data = await res.json();
        set({ cart: data });
      },

      // Add to cart
      addToCart: async (item) => {
        await fetch(`${BASE}/cart`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(item),
        });
        get().fetchCart();
        toast.success(`${item.name} added to cart`);
      },

      // Remove item
      removeFromCart: async (id) => {
        await fetch(`${BASE}/cart/${id}`, { method: "DELETE" });
        await get().fetchCart();
        toast.success(`${item.name} removed from cart`);

      },

      // Local checkout clear
      localCheckout: () => {
        set({ cart: { items: [], total: 0 } }); // ✅ fixed structure
      },

      // Also clear backend
      clearCartBackend: async () => {
        await fetch("http://localhost:3000/api/cart/clear", { method: "DELETE" });
        set({ cart: { items: [], total: 0 } });
        localStorage.removeItem("cart-storage");
      },
      updateQty: async (id, qty) => {
        await fetch(`${BASE}/cart/qty/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ qty }),
        });
        useCartStore.getState().fetchCart();
      },

    }),
    {
      name: "cart-storage", // localStorage key
      partialize: (state) => ({
        cart: state.cart,
        products: state.products,
      }), // saves only needed parts
    }
  )
);
