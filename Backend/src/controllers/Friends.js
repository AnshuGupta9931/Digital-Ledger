import {friendRequest} from "../models/FriendRequest.js"
import {User} from "../models/User.js"

// Send a friend request
export const sendFriendRequest = async (req, res) => {
    const { email } = req.body;
    const senderId = req.user._id;
  
    try {
      const recipient = await User.findOne({ email });
      if (!recipient) return res.status(404).json({ error: "User not found" });
  
      const existingRequest = await FriendRequest.findOne({
        sender: senderId,
        recipient: recipient._id,
        status: "pending"
      });
  
      if (existingRequest) return res.status(400).json({ error: "Request already sent" });
  
      const newRequest = new FriendRequest({
        sender: senderId,
        recipient: recipient._id
      });
  
      await newRequest.save();
      res.status(201).json({ message: "Request sent" });
  
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  };
  
  // Get pending friend requests
  export const getPendingRequests = async (req, res) => {
    const userId = req.user._id;
  
    try {
      const requests = await FriendRequest.find({
        recipient: userId,
        status: "pending"
      }).populate("sender", "name email");
  
      res.json(requests);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  };
  
  // Accept friend request
  export const acceptFriendRequest = async (req, res) => {
    const requestId = req.params.id;
  
    try {
      const request = await FriendRequest.findById(requestId);
      if (!request) return res.status(404).json({ error: "Request not found" });
  
      request.status = "accepted";
      await request.save();
  
      // Optionally update both users' friend lists
      await User.findByIdAndUpdate(request.sender, {
        $push: { friends: request.recipient }
      });
      await User.findByIdAndUpdate(request.recipient, {
        $push: { friends: request.sender }
      });
  
      res.json({ message: "Friend request accepted" });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  };
  
  // Decline friend request
  export const declineFriendRequest = async (req, res) => {
    const requestId = req.params.id;
  
    try {
      const request = await FriendRequest.findById(requestId);
      if (!request) return res.status(404).json({ error: "Request not found" });
  
      request.status = "declined";
      await request.save();
  
      res.json({ message: "Friend request declined" });
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  };
  
  // Get friends list
  export const getFriendsList = async (req, res) => {
    const userId = req.user._id;
  
    try {
      const user = await User.findById(userId).populate("friends", "name email");
      res.json(user.friends);
    } catch (err) {
      res.status(500).json({ error: "Server error" });
    }
  };