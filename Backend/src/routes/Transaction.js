import express from "express"
const router = express.Router()

import {auth} from "../middlewares/auth.js";

import {createTransaction, getAllTransactions, filterTransactions, getPaginatedTransactions, getMonthlySummary, updateTransaction, deleteTransaction} from "../controllers/Transaction.js";

// ********************************************************************************************************
//                                      Transaction routes
// ********************************************************************************************************
router.post("/createTransaction", auth, createTransaction);
router.get("/showAllTransactions", auth, getAllTransactions);
router.post("/filterTransaction", auth, filterTransactions);
router.post("/getPage", auth, getPaginatedTransactions);
router.post("/getMonthSummary", auth, getMonthlySummary);
router.put("/updateTransaction", auth, updateTransaction);
router.delete("/deleteTransaction", auth, deleteTransaction);


// router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);
export default router;