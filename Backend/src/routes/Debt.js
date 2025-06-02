import express from "express"
const router = express.Router()

import {auth} from "../middlewares/auth.js";

import {createDebt, getDebtsForUser, settleDebt, deleteDebt} from "../controllers/Debt.js";

// ********************************************************************************************************
//                                      Debt routes
// ********************************************************************************************************
router.post("/createDebt", auth, createDebt);
router.get("/showAllDebt", auth, getDebtsForUser);
router.put("/settleDebt", auth, settleDebt);
router.delete("/deleteDebt", auth, deleteDebt);
// router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);
export default router;