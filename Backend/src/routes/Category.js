import express from "express"
const router = express.Router()

import {auth} from "../middlewares/auth.js";

import {createCategory, showAllCategory} from "../controllers/Category.js";

// ********************************************************************************************************
//                                      Category routes
// ********************************************************************************************************
router.post("/createCategory", auth, createCategory);
router.get("/getAllCategory", auth, showAllCategory);
// router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);
export default router;