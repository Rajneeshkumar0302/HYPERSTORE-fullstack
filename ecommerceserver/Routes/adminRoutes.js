// routes/adminRoutes.js
import express from "express";
import Product from "../models/Productmodel.js";
import User from "../models/User.js";
import { protect, adminOnly } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * NOTE:
 * This file should expose only admin routes.
 * Auth (register/login) should live in routes/authRoutes.js mounted at /api/auth
 */

/**
 * GET  /api/admin/check
 * Test endpoint: requires a valid token (any user)
 */
router.get("/check", protect, (req, res) => {
  return res.json({
    ok: true,
    message: `Hello ${req.user.name || req.user.username || req.user.email}`,
    role: req.user.role,
  });
});



/**
 * GET /api/admin/users
 * Protected: admin only
 * Description: Fetch all users (without passwords)
 */
router.get("/users", protect, adminOnly, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    return res.status(200).json(users);
  } catch (err) {
    console.error("Fetch users error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});


/**
 * POST /api/admin/addproduct
 * Protected: admin only
 * Body: { name, price, category, image, ... }
 */
router.post("/addproduct", protect, adminOnly, async (req, res) => {
  try {
    const { name, price, category, image, ...rest } = req.body;
    if (!name || !price) {
      return res.status(400).json({ message: "Missing required fields: name and price" });
    }
    const newProduct = await Product.create({
      name,
      price,
      category: category || "General",
      image: image || "",
      ...rest,
    });
    return res.status(201).json({ message: "Product created", product: newProduct });
  } catch (err) {
    console.error("Add product error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
});


router.get("/products", protect, adminOnly, async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});
/**
 * PUT /api/admin/update/:id
 * Protected: admin only
 * Body: fields to update
 */
// UPDATE USER (admin only)
router.put("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    const { name, role } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (name) user.name = name;
    if (role) user.role = role;

    await user.save();

    res.json({
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ message: "Server error" });
  }
});


/**
 * DELETE /api/admin/delete/:id
 */


// DELETE user (admin only)
router.delete("/users/:id", protect, adminOnly, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

/* 👇 ADD THIS ROUTE */
router.get("/me", protect, (req, res) => {
  res.json({
    _id: req.user._id,
    email: req.user.email,
    role: req.user.role,
  });
});


export default router;

