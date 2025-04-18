import mongoose from "mongoose";
const debtSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  friend: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  amount: Number,
  isSettled: { type: Boolean, default: false }
})
export const Debt = mongoose.model("Debt",debtSchema);