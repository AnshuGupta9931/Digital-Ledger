import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema({
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "User"
    },
    amount : {type : Number},
    type: { type: String, enum: ['income', 'expense'] },
  category: {type : String},
  description: {type : String},
  date: { type: Date, default: Date.now },

},{timestamps : true})

export const Transaction = mongoose.model("Transaction",transactionSchema);

