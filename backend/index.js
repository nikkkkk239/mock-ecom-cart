import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./config/db.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";

dotenv.config();
const app = express();
connectDB();

app.use(cors({
    origin: '*',
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
app.use(express.json());

app.get("/test", (req, res) => {
  res.json({ message: "Test route working ✅" });
});

app.use("/api",productRoutes );
app.use("/api", cartRoutes );


app.listen(process.env.PORT, () =>
  console.log(`Server running on port ${process.env.PORT}`)
);
