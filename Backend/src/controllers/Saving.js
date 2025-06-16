import { Saving } from "../models/Saving.js";
import { User } from "../models/User.js";
export const createSavingGoals = async (req, res) => {
  try {
    const { title, goalAmount } = req.body; // ✅ FIXED
    const userId = req.user.id;

    if (!title || !goalAmount) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const newSaving = await Saving.create({
      user: userId,
      title,
      goalAmount,
      savedAmount: 0, // optionally set this if your schema expects it
    });

    res.status(201).json({ success: true, saving: newSaving });
  } catch (error) {
    console.error("Error creating the saving goal:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


export const getAllSavingForUser = async(req,res)=>{
    try{
        const userId = req.user.id;
        const savings = await Saving.find({user : userId});
        res.status(201).json({success : true,savings});
    }catch(error){
        console.error("Error fetching savings:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const updateSavingGoal = async (req, res) => {
  try {
    const { id, title, goalAmount, savedAmount } = req.body;

    if (!id) {
      return res.status(400).json({ success: false, message: "Saving goal ID is required" });
    }

    const updatedSaving = await Saving.findByIdAndUpdate(
      id,
      { title, goalAmount, savedAmount },
      { new: true }
    );

    if (!updatedSaving) {
      return res.status(404).json({ success: false, message: "Saving not found" });
    }

    res.status(200).json({ success: true, saving: updatedSaving });
  } catch (err) {
    console.error("Error updating saving goal:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};


// Delete a saving goal
export const deleteSavingGoal = async (req, res) => {
    try {
      const { id } = req.body;
  
      const deletedSaving = await Saving.findByIdAndDelete(id);
  
      if (!deletedSaving) {
        return res.status(404).json({ success: false, message: "Saving not found" });
      }
  
      res.status(200).json({ success: true, message: "Saving deleted successfully" });
    } catch (err) {
      console.error("Error deleting saving goal:", err);
      res.status(500).json({ success: false, message: "Internal server error" });
    }
};

// Add to saved amount
export const addToSaving = async (req, res) => {
  try {
    const { id, amount } = req.body;

    if (!id || typeof amount !== "number") {
      return res
        .status(400)
        .json({ success: false, message: "ID and valid amount are required" });
    }

    const saving = await Saving.findById(id);

    if (!saving) {
      return res
        .status(404)
        .json({ success: false, message: "Saving not found" });
    }

    saving.savedAmount += amount;
    await saving.save();

    // ✅ Update user's total savings
    await User.findByIdAndUpdate(saving.user, {
      $inc: { savings: amount },
    });

    res.status(200).json({ success: true, saving });
  } catch (err) {
    console.error("Error adding to saving:", err);
    res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};



// sub to saved amount
export const subToSaving = async (req, res) => {
  try {
    const { id, amount } = req.body;

    if (!id || typeof amount !== "number") {
      return res.status(400).json({
        success: false,
        message: "ID and valid amount are required",
      });
    }

    const saving = await Saving.findById(id);

    if (!saving) {
      return res
        .status(404)
        .json({ success: false, message: "Saving not found" });
    }

    const deductedAmount = Math.min(saving.savedAmount, amount);
    saving.savedAmount -= deductedAmount;
    await saving.save();

    // ✅ Decrease user total savings, but not below 0
    const user = await User.findById(saving.user);
    if (user) {
      user.savings = Math.max(0, user.savings - deductedAmount);
      await user.save();
    }

    res.status(200).json({ success: true, saving });
  } catch (err) {
    console.error("Error subtracting from saving:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
