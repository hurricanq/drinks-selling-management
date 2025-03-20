import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.route.js";
import categoryRoutes from "./routes/category.route.js";
import drinkRoutes from "./routes/drink.route.js";
import cartRoutes from "./routes/cart.route.js";
import paymentRoutes from "./routes/payment.route.js";

import { connectDB } from "./config/db.js";

dotenv.config();

const PORT = process.env.PORT || 6900;
const app = express();
const __dirname = path.resolve();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(
    cors({
        origin: "http://localhost:5173",
        methods: ["POST", "GET", "PUT", "DELETE"],
        credentials: true
    })
);

app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/drinks", drinkRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/payment", paymentRoutes);

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));
  
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    });
  }

app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
    connectDB();
})