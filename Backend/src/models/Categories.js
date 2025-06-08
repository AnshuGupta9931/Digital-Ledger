import mongoose from "mongoose";
const categoriesSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    totalSpent: { type: Number, default: 0 },
  });

  export const Categories = mongoose.model("Categories",categoriesSchema);