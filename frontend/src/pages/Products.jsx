import React, { useEffect } from "react";
import { useCartStore } from "../store/cartStore";

export default function Products() {
  const { products, fetchProducts, addToCart } = useCartStore();

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Products</h2>
      <div className="grid md:grid-cols-3 gap-4">
        {products.map((p) => (
          <div key={p.id} className="border p-4 rounded-lg shadow hover:shadow-lg transition">
            <img src={p.img} alt="" className="w-full h-[70%] object-cover" />
            <div className="flex justify-between items-center my-2">
                <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="text-gray-600">₹{p.price}</p>
            </div>
            
            <button
              onClick={() => addToCart({ ...p, qty: 1 })}
              className="mt-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full cursor-pointer"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
