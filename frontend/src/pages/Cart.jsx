import React, { useEffect } from "react";
import { useCartStore } from "../store/cartStore";
import { useNavigate } from "react-router-dom";
import Checkout from "./Checkout";

export default function Cart() {
  const { cart, fetchCart, removeFromCart,updateQty } = useCartStore();
  const navigate = useNavigate();
  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <div>
      {cart?.items?.length != 0 && <h2 className="text-2xl font-bold mb-4">Cart (Total: ₹{cart?.total || 0})</h2>}

      {(!cart?.items || cart.items.length === 0) && (
        <div className="flex justify-center items-center flex-col gap-1">
        <p className="text-gray-500 text-xl text-center ">Your cart is empty 🛒</p>
        <p onClick={()=>navigate("/")} className="text-blue-500 cursor-pointer underline">Back to products page.</p>
        </div>
      )}

      <div className="space-y-3">
        {cart?.items?.map((item) => (
  <div
    key={item._id}
    className="border p-4 rounded-lg flex justify-between items-center shadow"
  >
    <div>
      <h4 className="font-medium">{item.name}</h4>
      <p className="text-sm text-gray-600">
        ₹{item.price} × {item.qty} = ₹{item.price * item.qty}
      </p>

      {/* Quantity Controls */}
      <div className="flex items-center gap-3 mt-2">
        <button
          onClick={() => updateQty(item._id, item.qty - 1)}
          disabled={item.qty === 1}
          className="px-2 bg-gray-200 rounded disabled:opacity-50"
        >
          ➖
        </button>

        <span className="font-semibold">{item.qty}</span>

        <button
          onClick={() => updateQty(item._id, item.qty + 1)}
          className="px-2 bg-gray-200 rounded"
        >
          ➕
        </button>
      </div>
    </div>

    <button
      onClick={() => removeFromCart(item._id)}
      className="text-red-600 font-semibold hover:underline"
    >
      Remove
    </button>
  </div>
))}

      </div>
      <Checkout/>
    </div>
  );
}
