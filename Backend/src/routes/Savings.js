import express from "express"
const router = express.Router()

import {auth} from "../middlewares/auth.js";

import {createSavingGoals, updateSavingGoal, deleteSavingGoal, getAllSavingForUser, addToSaving, subToSaving} from "../controllers/Saving.js";

// ********************************************************************************************************
//                                      Savings routes
// ********************************************************************************************************
router.post("/createSavings", auth, createSavingGoals);
router.put("/updateSavings", auth, updateSavingGoal);
router.delete("/deleteSavings", auth, deleteSavingGoal);
router.get("/showAllSavings", auth, getAllSavingForUser);
router.post("/addSavings", auth, addToSaving);
router.post("/subSavings", auth, subToSaving);



// router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);
export default router;