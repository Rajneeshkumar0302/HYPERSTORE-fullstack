import express from "express";
import {
  addProduct,
  getAllProducts,
  getProductsByCategory,
  getProductById,
  deleteProduct,
} from "../Controllers/Productcontrol.js";

import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

// ✅ CREATE PRODUCT (Admin Only)
router.post("/add", protect, adminOnly, addProduct);

// ✅ GET ALL PRODUCTS
router.get("/", getAllProducts);

// ✅ GET PRODUCTS BY CATEGORY
router.get("/category/:category", getProductsByCategory);

// ✅ GET SINGLE PRODUCT
router.get("/:id", getProductById);

// ✅ DELETE PRODUCT (Admin Only)
router.delete("/:id", protect, adminOnly, deleteProduct);

export default router;
