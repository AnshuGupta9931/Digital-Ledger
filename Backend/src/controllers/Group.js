import { Group } from "../models/Group.js";
import { User } from "../models/User.js"; 

// Create a new group
export const createGroup = async (req, res) => {
  try {
    const { name, members } = req.body;
    const createdBy = req.user._id;

    const newGroup = new Group({
      name,
      members,
      createdBy,
    });

    await newGroup.save();

    // ✅ Populate member names/emails before sending
    await newGroup.populate("members", "firstName lastName email");

    res.status(201).json({ message: "Group created successfully", group: newGroup });
  } catch (error) {
    res.status(500).json({ error: "Failed to create group" });
  }
};


// Get all groups for the logged-in user
export const getUserGroups = async (req, res) => {
  try {
    const userId = req.user._id;

    const groups = await Group.find({
      $or: [{ createdBy: userId }, { members: userId }]
    })
    .populate("members", "firstName lastName email")
    .populate("createdBy", "firstName lastName");


    res.status(200).json({ groups });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch groups", details: error.message });
  }
};

// Get a specific group by ID
export const getGroupById = async (req, res) => {
  try {
    const { id } = req.body;

    const group = await Group.findById(id)
      .populate("members", "firstName lastName email")
      .populate("createdBy", "firstName lastName");

    if (!group) return res.status(404).json({ message: "Group not found" });

    res.status(200).json({ group });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch group", details: error.message });
  }
};

// Update group (e.g. name or members)
export const updateGroup = async (req, res) => {
  try {
    const { id, name, members } = req.body;

    const validMembers = (members || []).filter((id) => id);

    const updatedGroup = await Group.findByIdAndUpdate(
      id,
      { name, members: validMembers },
      { new: true }
    )
    .populate("members", "firstName lastName email")
    .populate("createdBy", "firstName lastName");


    if (!updatedGroup) return res.status(404).json({ message: "Group not found" });
    console.log("Group response:", updatedGroup);

    res.status(200).json({ message: "Group updated", group: updatedGroup });
  } catch (error) {
    res.status(500).json({ error: "Failed to update group", details: error.message });
  }
};


// Delete a group
export const deleteGroup = async (req, res) => {
  try {
    const { id } = req.body;

    const deleted = await Group.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "Group not found" });

    res.status(200).json({ message: "Group deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete group", details: error.message });
  }
};
