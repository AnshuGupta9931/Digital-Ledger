// routes/googleAuth.js
import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// Redirect to Google OAuth
router.get("/google", passport.authenticate("google", {
  scope: ["profile", "email"]
}));

// Callback from Google
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  (req, res) => {
    console.log("Google callback user:", req.user);
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    res.clearCookie(token);
    // Optional: Redirect with token in query
    res.redirect(
      `https://digital-ledger-frontend.onrender.com/oauth-success?token=${token}&user=${encodeURIComponent(JSON.stringify(req.user))}`
    );
    
  }
);

export default router;
