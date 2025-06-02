import express from "express"
const router = express.Router()

import {auth} from "../middlewares/auth.js";

import {createBill, updateBill, deleteBill, getBills, getBillById} from "../controllers/RecuringBills.js";

// ********************************************************************************************************
//                                      Recurring Bills routes
// ********************************************************************************************************
router.post("/createBill", auth, createBill);
router.put("/updateBill", auth, updateBill);
router.delete("/deleteBill", auth, deleteBill);
router.get("/showAllBills", auth, getBills);
router.get("/getBillid", auth, getBillById);

// router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);
export default router;