import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/User.js";

dotenv.config({ path: "./.env" });

export const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization")?.replace("Bearer ", "").trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing.",
      });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("Decoded Token:", decoded);

      const userId = decoded._id || decoded.id;
      const user = await User.findById(userId).select("name email");
      if (!user) {
        return res.status(401).json({ success: false, message: "User not found" });
      }

      req.user = user; // now includes name, email, _id
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Token is invalid or expired.",
      });
    }
  } catch (err) {
    console.error("Auth Middleware Error:", err.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong while validating the token.",
    });
  }
};
