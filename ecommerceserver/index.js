import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

// ROUTES
import authRoutes from "./Routes/authRoutes.js";
import adminRoutes from "./Routes/adminRoutes.js";
import productRoutes from "./Routes/ProductRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

/* =========================
   CORS CONFIG (FINAL & SAFE)
========================= */

const allowedOrigins = [
  "http://localhost:5173", // local frontend
];

app.use(
  cors({
    origin: (origin, callback) => {
      // allow server-to-server, Postman, etc.
      if (!origin) {
        return callback(null, true);
      }
      // allow ALL Vercel deployments (prod + preview)
      if (
        origin.endsWith(".vercel.app") ||
        allowedOrigins.includes(origin)
      ) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

/* =========================
   MIDDLEWARE
========================= */

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* =========================
   DATABASE
========================= */

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB error:", err));

/* =========================
   ROUTES
========================= */

app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);

/* =========================
   SERVER
========================= */

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
