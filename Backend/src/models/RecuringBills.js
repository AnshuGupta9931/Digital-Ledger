import mongoose from "mongoose";
const recuringBillsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  amount: Number,
  dueDate: Date,
  frequency: String, // e.g., 'monthly', 'weekly'
  isPaid: { type: Boolean, default: false },
})
export const RecuringBills = mongoose.model("RecuringBills",recuringBillsSchema)