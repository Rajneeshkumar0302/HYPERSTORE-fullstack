// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import User from "../models/User.js";



export const protect = async (req, res, next) => {
  try {
    const token =
  req.cookies?.token ||
  req.headers.authorization?.split(" ")[1]; // 'Bearer <token>'
    if (!token) return res.status(401).json({ message: "Not authorized, no token" });

    // ✅ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // ✅ Attach user data (without password)
    req.user = await User.findById(decoded.id).select("-password");
    if (!req.user) return res.status(404).json({ message: "User not found" });
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: "Token failed or expired" });
  }
};

// ✅ Only Admin Middleware
export const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied, admin only" });
  }
};
  