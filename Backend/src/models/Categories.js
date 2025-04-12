import mongoose from "mongoose";
const categoriesSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    name: String,
    totalSpent: Number,
  });

  export const Categories = mongoose.model("Categories",categoriesSchema);