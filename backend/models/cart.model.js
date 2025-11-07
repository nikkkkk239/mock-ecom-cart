import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
  items: [
    {
      productId: String,
      name: String,
      price: Number,
      qty: Number
    }
  ],
  total: Number,
  createdAt: { type: Date, default: Date.now }
});

const Cart = mongoose.model("Cart", CartSchema);


export default Cart;
