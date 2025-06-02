import express from "express"
const router = express.Router()

import {auth} from "../middlewares/auth.js";

import {createGroup, updateGroup, deleteGroup, getUserGroups, getGroupById} from "../controllers/Group.js";

// ********************************************************************************************************
//                                      Group routes
// ********************************************************************************************************
router.post("/createGroup", auth, createGroup);
router.get("/showAllGroups", auth, getUserGroups);
router.get("/showGroupsById", auth, getGroupById);
router.delete("/deleteGroup", auth, deleteGroup);
router.put("/updateGroup", auth, updateGroup);
// router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);
export default router;