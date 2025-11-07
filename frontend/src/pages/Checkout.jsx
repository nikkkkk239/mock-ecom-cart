import { useState } from "react";
import { useCartStore } from "../store/cartStore";

const Checkout = () => {
  const { cart, localCheckout, clearCartBackend } = useCartStore();
  const [showReceipt, setShowReceipt] = useState(false);
  const [total, setTotal] = useState(0);
  const [cartItems , setCartItems] = useState([]);

  // Dummy user & company data
  const user = {
    name: "Nikhil Panday",
    email: "nikhil@example.com",
    address: "221B, Innovation Street, Bangalore, India - 560100",
  };

  const company = {
    name: "Vibe Commerce Pvt Ltd",
    address: "3rd Floor, Tech Park, MG Road, Bangalore, India",
    email: "support@vibecommerce.in",
    phone: "+91 98765 43210",
    gst: "29ABCDE1234F2Z5",
  };

  const handleCheckout = async () => {
    if (!cart?.items || cart.items.length === 0) return;
    setCartItems(cart.items);
    setTotal(cart.total);
    setShowReceipt(true);

    await localCheckout();
    await clearCartBackend();
  };

  const orderId = "VC-" + Math.floor(100000 + Math.random() * 900000);

  return (
    <div className="mt-6 p-4 border-t">
      {cart.items.length != 0 && <button
        onClick={handleCheckout}
        disabled={!cart?.items?.length}
        className={`p-3 w-full cursor-pointer text-white rounded-lg text-lg font-semibold transition ${
          cart?.items?.length ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Pay ₹{cart?.total || 0}
      </button>}

      {showReceipt && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white w-[420px] p-6 rounded-lg shadow-xl">

            {/* Company Details */}
            <div className="text-center border-b pb-3">
              <h2 className="text-2xl font-bold text-gray-800">{company.name}</h2>
              <p className="text-xs text-gray-600">{company.address}</p>
              <p className="text-xs">📧 {company.email} | 📞 {company.phone}</p>
              <p className="text-xs font-semibold">GST: {company.gst}</p>
            </div>

            {/* Order Details */}
            <div className="mt-3 text-sm space-y-1 border-b pb-3">
              <p><strong>Order ID:</strong> {orderId}</p>
              <p><strong>Date:</strong> {new Date().toLocaleString()}</p>
            </div>

            {/* Customer Details */}
            <div className="mt-3 text-md border-b pb-3">
              <h3 className="font-semibold text-gray-700 text-xl">Bill To:</h3>
              <p>{user.name}</p>
              <p className="text-md">{user.email}</p>
              <p className="text-md">{user.address}</p>
            </div>

            {/* Products Table */}
            <div className="mt-4">
              <h3 className="font-semibold text-xl mb-2">Order Summary</h3>
              <div className="text-md">
                {cartItems?.map((item, i) => (
                  <div key={i} className="flex justify-between border-b py-1">
                    <span>{item.name} × {item.qty}</span>
                    <span>₹{item.price * item.qty}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="text-right text-lg font-bold mt-3">
              Total: ₹{total}
            </div>

            {/* Thank you note */}
            <div className="text-center mt-4 text-gray-500">
              Thank you for shopping with Vibe Commerce ❤️
            </div>

            {/* Close Button */}
            <button
              onClick={() => setShowReceipt(false)}
              className="mt-4 bg-blue-600 text-white p-2 w-full rounded-lg hover:bg-blue-700 cursor-pointer"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
