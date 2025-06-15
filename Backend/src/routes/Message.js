import express from "express";
import Message from "../models/Message.js";
const router = express.Router();

// Get messages between two users
router.get("/:userId/:friendId", async (req, res) => {
  const { userId, friendId } = req.params;

  try {
    const messages = await Message.find({
      $or: [
        { from: userId, to: friendId },
        { from: friendId, to: userId },
      ],
    }).sort({ timestamp: 1 }); // oldest first

    res.json({ success: true, messages });
  } catch (err) {
    res.status(500).json({ success: false, error: "Failed to fetch messages" });
  }
});

export default router;
