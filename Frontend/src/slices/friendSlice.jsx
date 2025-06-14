import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friends: {},              // Now an object
  pendingRequests: {},      // Now an object
  loading: false,
};

const friendSlice = createSlice({
  name: "friend",
  initialState,
  reducers: {
    setFriendsList: (state, action) => {
      const friendMap = {};
      const friendArray = action.payload.friends || [];
      friendArray.forEach(friend => {
        friendMap[friend._id] = friend;
      });
      state.friends = friendMap;
    },

    setPendingRequests: (state, action) => {
      const pendingMap = {};
      action.payload.forEach(req => {
        pendingMap[req._id] = req;
      });
      state.pendingRequests = pendingMap;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    addFriend: (state, action) => {
      const friend = action.payload;
      state.friends[friend._id] = friend;
    },

    removeFriend: (state, action) => {
      delete state.friends[action.payload]; // action.payload = _id
    },

    acceptFriendRequest: (state, action) => {
      const friendId = action.payload; // just id string
      const friend = state.pendingRequests[friendId];
      if (friend) {
        state.friends[friendId] = friend;
        delete state.pendingRequests[friendId];
      } 
    },


    rejectFriendRequest: (state, action) => {
      delete state.pendingRequests[action.payload]; // action.payload = _id
    },
  },
});

export const {
  setFriendsList,
  setPendingRequests,
  setLoading,
  addFriend,
  removeFriend,
  acceptFriendRequest,
  rejectFriendRequest,
} = friendSlice.actions;

export default friendSlice.reducer;
