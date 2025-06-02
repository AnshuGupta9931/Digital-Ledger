import { Debt } from "../models/Debt.js";

// Create a new debt
export const createDebt = async (req, res) => {
  try {
    const { friendId, amount } = req.body;
    const userId = req.user._id;

    const newDebt = new Debt({
      user: userId,
      friend: friendId,
      amount,
    });

    await newDebt.save();
    res.status(201).json({ message: "Debt created successfully", debt: newDebt });
  } catch (err) {
    res.status(500).json({ error: "Failed to create debt", details: err.message });
  }
};

// Get all unsettled debts for a user
export const getDebtsForUser = async (req, res) => {
  try {
    const userId = req.user._id;

    const debts = await Debt.find({ user: userId, isSettled: false })
      .populate("friend", "firstName lastName email");

    res.status(200).json(debts);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch debts", details: err.message });
  }
};

// Settle a debt
export const settleDebt = async (req, res) => {
  try {
    const { id } = req.body; // ✅ get id from body

    const updatedDebt = await Debt.findByIdAndUpdate(
      id,
      { isSettled: true },
      { new: true }
    );

    if (!updatedDebt) return res.status(404).json({ message: "Debt not found" });

    res.status(200).json({ message: "Debt settled", debt: updatedDebt });
  } catch (err) {
    res.status(500).json({ error: "Failed to settle debt", details: err.message });
  }
};


// Delete a debt 
export const deleteDebt = async (req, res) => {
  try {
    const { id } = req.body; // ✅ Get id from body

    const deletedDebt = await Debt.findByIdAndDelete(id);

    if (!deletedDebt) return res.status(404).json({ message: "Debt not found" });

    res.status(200).json({ message: "Debt deleted", debt: deletedDebt });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete debt", details: err.message });
  }
};
