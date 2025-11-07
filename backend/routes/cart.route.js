import express from "express";
import Cart from "../models/cart.model.js";

const router = express.Router();

router.post("/cart", async (req, res) => {
  const { productId, name, price, qty } = req.body;

  let cart = await Cart.findOne();
  if (!cart) cart = new Cart({ items: [], total: 0 });

  cart.items.push({ productId, name, price, qty });
  cart.total = cart.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  await cart.save();

  res.json(cart);
});

router.get("/cart", async (req, res) => {
  const cart = await Cart.findOne();
  res.json(cart || { items: [], total: 0 });
});

// Update quantity of a cart item
router.put("/cart/qty/:id", async (req, res) => {
  const { qty } = req.body;

  if (qty < 1) return res.status(400).json({ message: "Minimum qty is 1" });

  let cart = await Cart.findOne();
  if (!cart) return res.status(404).json({ message: "Cart not found" });

  cart.items = cart.items.map(item =>
    item._id.toString() === req.params.id ? { ...item, qty } : item
  );

  // Recalculate total
  cart.total = cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);

  await cart.save();
  res.json(cart);
});



router.delete("/cart/clear", async (req, res) => {
  let cart = await Cart.findOne();

  if (!cart) {
    cart = new Cart({ items: [], total: 0 }); // ✅ create empty cart if not exists
  }

  cart.items = [];
  cart.total = 0;
  await cart.save();

  res.json({ message: "Cart cleared successfully", cart });
});
router.delete("/cart/:id", async (req, res) => {
  let cart = await Cart.findOne();
  cart.items = cart.items.filter(
    item => item._id.toString() !== req.params.id
  );
  
  cart.total = cart.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  await cart.save();
  res.json(cart);
});




export default router;