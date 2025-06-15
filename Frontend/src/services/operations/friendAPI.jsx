import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector.jsx";
import { friendEndpoints } from "../apis.jsx";

import {
  setFriendsList,
  setPendingRequests,
  addFriend,
  removeFriend,
  setLoading,
  acceptFriendRequest,
  rejectFriendRequest,
} from "../../slices/friendSlice.jsx";

// Destructure API endpoints
const {
  SEND_REQUEST_API,
  GET_ALL_FRIENDS_API,
  GET_PENDING_REQUESTS_API,
  ACCEPT_REQUEST_API,
  DECLINE_REQUEST_API,
  GET_ALL_CHATS_API
} = friendEndpoints;

// ✅ Always get fresh token from localStorage
const getAuthHeader = () => ({
  Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
});

// ✅ Fetch all friends
export const fetchFriendsAPI = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await apiConnector("GET", GET_ALL_FRIENDS_API, null, getAuthHeader());
    dispatch(setFriendsList(response.data || []));
    toast.success("Friends list updated");
  } catch (error) {
    console.error("GET FRIENDS ERROR:", error);
    toast.error("Could not fetch friends");
  } finally {
    dispatch(setLoading(false));
  }
};

// ✅ Fetch all pending friend requests
export const fetchPendingRequestsAPI = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const response = await apiConnector("GET", GET_PENDING_REQUESTS_API, null, getAuthHeader());
    console.log("API response pending:", response.data);
    dispatch(setPendingRequests(response.data || []));
    toast.success("Pending requests updated");
  } catch (error) {
    console.error("GET PENDING REQUESTS ERROR:", error);
    toast.error("Could not fetch pending requests");
  } finally {
    dispatch(setLoading(false));
  }
};

// ✅ Send a friend request
export const sendFriendRequestAPI = (email) => async (dispatch, getState) => {
  if (!email || typeof email !== "string") {
    toast.error("Please provide a valid email");
    return;
  }

  const { friends, pendingRequests } = getState().friend;

  const friendArray = Object.values(friends);
  const pendingArray = Object.values(pendingRequests);

  const alreadyFriend = friendArray.some((f) => f.email === email);
  const alreadyPending = pendingArray.some((r) => r.email === email);

  if (alreadyFriend) {
    toast.error("User is already your friend");
    return;
  }

  if (alreadyPending) {
    toast.error("Friend request already sent");
    return;
  }

  const toastId = toast.loading("Sending friend request...");
  try {
    const res = await apiConnector("POST", SEND_REQUEST_API, { email }, getAuthHeader());
    toast.success(res.data.message || "Friend request sent", { id: toastId });
  } catch (err) {
    console.error("SEND FRIEND REQUEST ERROR:", err);
    toast.error(err.response?.data?.message || "Failed to send friend request", { id: toastId });
  }
};

// ✅ Accept a friend request
export const acceptFriendAPI = (friendId) => async (dispatch) => {
  const toastId = toast.loading("Accepting friend request...");
  try {
    const response = await apiConnector("POST", ACCEPT_REQUEST_API, { requestId: friendId }, getAuthHeader());

    if (response.data?.message === "Friend request accepted") {
      dispatch(acceptFriendRequest(friendId));
      toast.success("Friend request accepted!", { id: toastId });
    } else {
      toast.error("Failed to accept friend request.", { id: toastId });
    }
  } catch (err) {
    console.error("ACCEPT FRIEND ERROR:", err);
    toast.error(err.response?.data?.error || "Failed to accept friend", { id: toastId });
  }
};

// ✅ Decline a friend request
export const declineFriendAPI = (friendId) => async (dispatch) => {
  const toastId = toast.loading("Declining friend request...");
  try {
    await apiConnector("POST", DECLINE_REQUEST_API, { requestId: friendId }, getAuthHeader());
    dispatch(rejectFriendRequest(friendId));
    toast.success("Friend request declined", { id: toastId });
  } catch (err) {
    console.error("DECLINE FRIEND ERROR:", err);
    toast.error(err.response?.data?.message || "Failed to decline friend", { id: toastId });
  }
};
