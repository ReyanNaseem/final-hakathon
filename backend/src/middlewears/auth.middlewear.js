// middleware/authMiddleware.js
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    // Step 1: Check header
    if (!authHeader) {
      console.log("❌ No Authorization header found");
      return res.status(401).json({ message: "Unauthorized request: Missing header" });
    }

    // Step 2: Extract token
    if (!authHeader.startsWith("Bearer ")) {
      console.log("❌ Invalid token format:", authHeader);
      return res.status(401).json({ message: "Unauthorized request: Invalid token format" });
    }

    const token = authHeader.split(" ")[1];

    // Step 3: Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("✅ Decoded Token:", decoded);

    // Step 4: Find user
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      console.log("❌ No user found for this token ID:", decoded.id);
      return res.status(401).json({ message: "Invalid token: User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error.message);
    return res.status(401).json({
      message: "Invalid or expired token",
      error: error.message,
    });
  }
};
