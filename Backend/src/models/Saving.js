import mongoose from "mongoose";

const savingSchema  = new mongoose.Schema({

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: String,
  goalAmount: Number,
  savedAmount: { type: Number, default: 0 }
})

export const Saving = mongoose.model("Saving",savingSchema);