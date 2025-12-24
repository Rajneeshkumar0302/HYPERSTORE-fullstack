
import express from "express";
import {
  registerUser,
  loginUser,
  createAdmin,
} from "../Controllers/authController.js";  // ✅ use correct file path
import { protect } from "../middlewares/authMiddleware.js";


const router = express.Router();

// ===== AUTH ROUTES =====
// Register user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Create admin (optional)
router.post("/createadmin", createAdmin);


// 🔹 Get logged-in user
router.get("/me", protect, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});


export default router;
