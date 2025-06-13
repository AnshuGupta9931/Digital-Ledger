import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groups: [],        // all groups for user
  currentGroup: null, // for group detail view/edit
  loading: false,
};

const groupSlice = createSlice({
  name: "group",
  initialState,
  reducers: {
    setGroups: (state, action) => {
      state.groups = action.payload;
    },

    setCurrentGroup: (state, action) => {
      state.currentGroup = action.payload;
    },

    addGroup: (state, action) => {
      state.groups.push(action.payload);
    },

    updateGroupInList: (state, action) => {
      const updated = action.payload;
      state.groups = state.groups.map((g) =>
        g._id === updated._id ? updated : g
      );
    },

    removeGroup: (state, action) => {
      state.groups = state.groups.filter((g) => g._id !== action.payload);
    },
    
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setGroups,
  setCurrentGroup,
  addGroup,
  updateGroupInList,
  removeGroup,
  setLoading,
} = groupSlice.actions;

export default groupSlice.reducer;
