import express from "express"
const router = express.Router()

import {auth} from "../middlewares/auth.js";

import {sendFriendRequest, getFriendsList, getPendingRequests, acceptFriendRequest, declineFriendRequest} from "../controllers/Friends.js";

// ********************************************************************************************************
//                                      Friends Request routes
// ********************************************************************************************************
router.post("/sendFriendRequest", auth, sendFriendRequest);
router.get("/showAllFriends", auth, getFriendsList);
router.get("/showAllPendingFriends", auth, getPendingRequests);
router.post("/acceptFriend", auth, acceptFriendRequest);
router.post("/declineFriend", auth, declineFriendRequest);



// router.get("/instructorDashboard", auth, isInstructor, instructorDashboard);
export default router;