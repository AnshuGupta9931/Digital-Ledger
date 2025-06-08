import {friendRequest} from "../models/FriendRequest.js"
import {User} from "../models/User.js"
import mongoose from "mongoose";

// Send a friend request
export const sendFriendRequest = async (req, res) => {
  const { email } = req.body;
  const fromId = req.user._id;

  try {
    const toUser = await User.findOne({ email });
    if (!toUser) {
      return res.status(404).json({ error: "User not found" });
    }

    if (toUser._id.equals(fromId)) {
      return res.status(400).json({ error: "You cannot send a request to yourself" });
    }

    // Check for existing request in either direction
    const existingRequest = await friendRequest.findOne({
      $or: [
        { from: fromId, to: toUser._id },
        { from: toUser._id, to: fromId }
      ]
    });

    if (existingRequest) {
      const status = existingRequest.status?.toLowerCase();

      if (status === "pending") {
        return res.status(400).json({ error: "Friend request already pending" });
      }

      if (status === "accepted") {
        return res.status(400).json({ error: "You are already friends" });
      }

      if (status === "rejected") {
        // Re-send request by updating status and direction
        existingRequest.status = "pending";
        existingRequest.from = fromId;
        existingRequest.to = toUser._id;
        await existingRequest.save();
        return res.status(200).json({ message: "Friend request resent" });
      }
    }

    // No request found, create new one
    const newRequest = new friendRequest({
      from: fromId,
      to: toUser._id,
      status: "pending"
    });

    await newRequest.save();
    return res.status(201).json({ message: "Friend request sent successfully" });

  } catch (err) {
    console.error("Send Friend Request Error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
  
// Get pending friend requests
export const getPendingRequests = async (req, res) => {
  const userId = req.user._id;
  console.log("Current User:", userId);

  try {
    const requests = await friendRequest.find({
      to: userId,
      status: "pending"
    }).populate("from", "name email");

    res.json(requests);
  } catch (err) {
    console.error("Error fetching pending requests:", err);
    res.status(500).json({ error: "Server error" });
  }
};

  
// Accept friend request
export const acceptFriendRequest = async (req, res) => {
  const { requestId } = req.body;
  console.log("Request ID received Accept:", requestId);

  try {
    const request = await friendRequest.findById(requestId);
    if (!request) return res.status(404).json({ error: "Request not found" });

    request.status = "accepted";
    await request.save();

    const senderId = new mongoose.Types.ObjectId(request.from);      // ✅ FIXED
    const recipientId = new mongoose.Types.ObjectId(request.to);     // ✅ FIXED

    const sender = await User.findById(senderId);
    const recipient = await User.findById(recipientId);

    if (!sender || !recipient) {
      console.log("User(s) not found. Sender:", sender, "Recipient:", recipient);
      return res.status(404).json({ error: "One of the users not found" });
    }

    await User.findByIdAndUpdate(senderId, {
      $addToSet: { friends: recipientId },
    });
    await User.findByIdAndUpdate(recipientId, {
      $addToSet: { friends: senderId },
    });

    console.log("Friend request accepted between:", sender.email, "and", recipient.email);
    res.json({ message: "Friend request accepted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};



  
// Decline friend request
export const declineFriendRequest = async (req, res) => {
  const { requestId } = req.body;
  console.log("Request ID received Decline:", requestId);

  if (!requestId) {
    return res.status(400).json({ error: "Request ID is required" });
  }

  if (!mongoose.Types.ObjectId.isValid(requestId)) {
    return res.status(400).json({ error: "Invalid request ID" });
  }

  try {
    const request = await friendRequest.findById(requestId);
    if (!request) return res.status(404).json({ error: "Request not found" });

    request.status = "rejected";
    await request.save();

    res.json({ message: "Friend request declined" });
  } catch (err) {
    console.error("Decline friend request error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
  
// Get friends list
export const getFriendsList = async (req, res) => {
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const acceptedRequests = await friendRequest.find({
      $or: [{ from: userId }, { to: userId }],
      status: "accepted",
    });

    const friendIds = acceptedRequests.map((request) =>
      request.from.toString() === userId.toString() ? request.to : request.from
    );

    const friends = await User.find({ _id: { $in: friendIds } }).select(
      "firstName lastName email image accountType"
    );

    res.status(200).json({ friends });
  } catch (error) {
    console.error("Error fetching friends list:", error); // ✅ full stack trace
    res.status(500).json({ error: "Server error while fetching friends" });
  }
};

