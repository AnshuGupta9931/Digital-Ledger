import express from "express"
const router = express.Router()

import {auth} from "../middlewares/auth.js";

import {updateProfile, deleteAccount, getAllUserDetails, updateImage} from "../controllers/Profile.js";

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************
router.put("/updateProfile", auth, updateProfile);
router.delete("/deleteProfile", auth, deleteAccount);
router.get("/getUserDetails", auth, getAllUserDetails);
router.put("/updateImage", auth, updateImage);
// router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);
export default router;