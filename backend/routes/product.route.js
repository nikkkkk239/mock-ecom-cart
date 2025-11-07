import express from "express";
const router = express.Router();

const products = [
  { id: "1", name: "Wireless Mouse", price: 499 ,img:"https://m.media-amazon.com/images/I/61mpMH5TzkL._SL1500_.jpg"},
  { id: "2", name: "Keyboard", price: 999 ,img:"https://m.media-amazon.com/images/I/71kr3WAj1FL._SL1500_.jpg"},
  { id: "3", name: "Headphones", price: 1499 ,img:"https://m.media-amazon.com/images/I/61RahTQtAqL.jpg"},
  { id: "4", name: "Monitor", price: 8999 ,img:"https://www.tpstech.in/cdn/shop/files/81wEGCnscBL._SL1500.jpg?v=1703183550&width=1946"},
  { id: "5", name: "USB Cable", price: 199 ,img:"https://m.media-amazon.com/images/I/61kONYDgWpL._AC_UF1000,1000_QL80_.jpg"},
];

router.get("/products", (req, res) => {
  res.json(products);
});

export default router;