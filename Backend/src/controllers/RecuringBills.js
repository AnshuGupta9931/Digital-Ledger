import { RecuringBills } from "../models/RecuringBills.js";

// Add a new bill
export const createBill = async (req, res) => {
    const { title, amount, dueDate, frequency } = req.body;
  
    try {
      const newBill = new RecuringBills({
        user: req.user.id,
        title,
        amount,
        dueDate,
        frequency
      });
  
      const savedBill = await newBill.save();
      res.status(201).json(savedBill);
    } catch (error) {
      res.status(400).json({ message: "Failed to create bill", error });
    }
};


// Update an existing bill
export const updateBill = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Bill ID is required" });
    }

    const allowedFields = ['title', 'amount', 'dueDate', 'frequency'];
    const updateData = {};

    for (const key of allowedFields) {
      if (req.body[key] !== undefined) {
        updateData[key] = req.body[key];
      }
    }

    const bill = await RecuringBills.findOneAndUpdate(
      { _id: id, user: req.user.id },
      updateData,
      { new: true }
    );

    if (!bill) {
      return res.status(404).json({ message: "Bill not found" });
    }

    res.status(200).json({ message: "Bill updated successfully", bill });
  } catch (error) {
    res.status(400).json({ message: "Failed to update bill", error });
  }
};


  

// Delete a bill
export const deleteBill = async (req, res) => {
  try {
    const { id } = req.body; // Take the id from the body instead of params

    const bill = await RecuringBills.findOneAndDelete({ _id: id, user: req.user.id });
    if (!bill) return res.status(404).json({ message: "Bill not found" });

    res.status(200).json({ message: "Bill deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete bill", error });
  }
};


// Get all bills for a specific user
export const getBills = async (req, res) => {
    try {
      const bills = await RecuringBills.find({ user: req.user.id });
      res.status(200).json(bills);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bills", error });
    }
};
  

// Get a bill by ID
export const getBillById = async (req, res) => {
  try {
    const { id } = req.body; // Take the ID from the body instead of params

    const bill = await RecuringBills.findOne({ _id: id, user: req.user.id });
    if (!bill) return res.status(404).json({ message: "Bill not found" });

    res.status(200).json(bill);
  } catch (error) {
    res.status(500).json({ message: "Error getting bill", error });
  }
};
