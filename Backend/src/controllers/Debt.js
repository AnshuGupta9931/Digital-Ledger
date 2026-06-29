import { Debt } from "../models/Debt.js";

// Create a new debt
export const createDebt = async (req, res) => {
  try {
    const { friendId, amount } = req.body;
    const userId = req.user._id;

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      return res.status(400).json({ error: "Amount must be a positive number." });
    }

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

    const debt = await Debt.findById(id);
    if (!debt) return res.status(404).json({ message: "Debt not found" });

    if (debt.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to settle this debt" });
    }

    const updatedDebt = await Debt.findByIdAndUpdate(
      id,
      { isSettled: true },
      { new: true }
    );

    res.status(200).json({ message: "Debt settled", debt: updatedDebt });
  } catch (err) {
    res.status(500).json({ error: "Failed to settle debt", details: err.message });
  }
};


// Delete a debt 
export const deleteDebt = async (req, res) => {
  try {
    const { id } = req.body; // ✅ Get id from body

    const existingDebt = await Debt.findById(id);
    if (!existingDebt) return res.status(404).json({ message: "Debt not found" });

    if (existingDebt.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this debt" });
    }

    const deletedDebt = await Debt.findByIdAndDelete(id);

    res.status(200).json({ message: "Debt deleted", debt: deletedDebt });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete debt", details: err.message });
  }
};
