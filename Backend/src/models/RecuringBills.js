import mongoose from "mongoose";
const recuringBillsSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  amount: Number,
  dueDate: Date,
  frequency: String,
  isPaid: { type: Boolean, default: false },
}, { timestamps: true })
export const RecuringBills = mongoose.model("RecuringBills",recuringBillsSchema)