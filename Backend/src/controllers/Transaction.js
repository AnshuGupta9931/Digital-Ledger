import {Transaction} from "../models/Transaction.js"
import { Categories } from "../models/Categories.js";
// Create a transaction
export const createTransaction = async (req, res) => {
  try {
    const { amount, type, category, description, date } = req.body;
    const userId = req.user.id;

    const newTransaction = new Transaction({
      user: userId,
      amount,
      type,
      category,
      description,
      date: date || Date.now(),
    });

    // Handle category for expense
    if (type === "expense") {
      let existingCategory = await Categories.findOne({ user: userId, name: category });

      if (existingCategory) {
        existingCategory.totalSpent += amount;
        await existingCategory.save();
      } else {
        await Categories.create({
          user: userId,
          name: category,
          totalSpent: amount,
        });
      }
    }

    await newTransaction.save();
    res.status(201).json({ message: 'Transaction created', transaction: newTransaction });
  } catch (err) {
    console.error("CREATE TRANSACTION ERROR:", err); // 🔍 Better error visibility
    res.status(500).json({ error: err.message });
  }
};


// Get all transactions for a user
export const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });

    res.json({ transactions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET /transactions/filter?start=2024-01-01&end=2024-01-31&category=Food
export const filterTransactions = async (req, res) => {
  try {
    const { start, end, category } = req.body;

    const query = { user: req.user.id };

    if (start && end) {
      query.date = {
        $gte: new Date(start),
        $lte: new Date(end),
      };
    }

    if (category) {
      query.category = category;
    }

    const transactions = await Transaction.find(query).sort({ date: -1 });
    res.json({ transactions });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// POST /transactions/paginated
export const getPaginatedTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.body;

    const parsedPage = parseInt(page);
    const parsedLimit = parseInt(limit);

    const transactions = await Transaction.find({ user: req.user.id })
      .sort({ date: -1 })
      .skip((parsedPage - 1) * parsedLimit)
      .limit(parsedLimit);

    const total = await Transaction.countDocuments({ user: req.user.id });

    res.json({
      total,
      page: parsedPage,
      pages: Math.ceil(total / parsedLimit),
      transactions,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


  
  export const getMonthlySummary = async (req, res) => {
    try {
      const { month, year } = req.body;
  
      // Validate inputs
      if (!month || !year) {
        return res.status(400).json({ error: "Month and year are required." });
      }
  
      const parsedMonth = parseInt(month);
      const parsedYear = parseInt(year);
  
      // Validate parsed values
      if (isNaN(parsedMonth) || isNaN(parsedYear) || parsedMonth < 1 || parsedMonth > 12) {
        return res.status(400).json({ error: "Invalid month or year." });
      }
  
      const start = new Date(parsedYear, parsedMonth - 1, 1);
      const end = new Date(parsedYear, parsedMonth, 0, 23, 59, 59);
  
      // Fetch transactions for the month
      const transactions = await Transaction.find({
        user: req.user.id,
        date: { $gte: start, $lte: end },
      });
  
      const summary = transactions.reduce(
        (acc, tx) => {
          if (tx.type === 'income') acc.income += tx.amount;
          else acc.expense += tx.amount;
          return acc;
        },
        { income: 0, expense: 0 }
      );
  
      res.status(200).json({ summary });
    } catch (err) {
      console.error("Error in getMonthlySummary:", err);
      res.status(500).json({ error: err.message });
    }
  };
  
  
// Update transaction
export const updateTransaction = async (req, res) => {
  try {
    const { id, amount, type, category, description, date } = req.body;

    const existingTransaction = await Transaction.findById(id);
    if (!existingTransaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const userId = req.user._id;

    // Adjust category totals if it's an expense
    if (existingTransaction.type === "expense") {
      // Subtract old amount from old category
      const oldCategory = await Categories.findOne({ user: userId, name: existingTransaction.category });
      if (oldCategory) {
        oldCategory.totalSpent -= existingTransaction.amount;
        oldCategory.totalSpent = Math.max(0, oldCategory.totalSpent);
        await oldCategory.save();
      }

      // Add new amount to new category
      const newCategory = await Categories.findOne({ user: userId, name: category });
      if (newCategory) {
        newCategory.totalSpent += amount;
        await newCategory.save();
      } else {
        await Categories.create({
          user: userId,
          name: category,
          totalSpent: amount,
        });
      }
    }

    // Update the transaction
    existingTransaction.amount = amount;
    existingTransaction.category = category;
    existingTransaction.description = description;
    existingTransaction.date = date;
    await existingTransaction.save();

    res.status(200).json({ message: "Transaction updated", transaction: existingTransaction });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// DELETE /transactions
export const deleteTransaction = async (req, res) => {
  try {
    const { id } = req.body;
    const transaction = await Transaction.findById(id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    const userId = req.user.id || req.user._id;

    console.log("Deleting transaction:", transaction);

    // Update category total if it's an expense
    if (transaction.type === "expense") {
      const category = await Categories.findOne({
        user: userId,
        name: transaction.category,
      });

      if (category) {
        console.log("Original totalSpent:", category.totalSpent);
        category.totalSpent -= Number(transaction.amount);
        category.totalSpent = Math.max(0, category.totalSpent);
        await category.save();
        console.log("Updated category:", category);
      } else {
        console.warn("Category not found for:", transaction.category);
      }
    }

    await transaction.deleteOne();
    res.status(200).json({ message: "Transaction deleted successfully" });
  } catch (err) {
    console.error("DELETE TRANSACTION ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};




