import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  savings: [],
  loading: false,
  error: null,
};

const savingSlice = createSlice({
  name: "saving",
  initialState,
  reducers: {
    setSavings(state, action) {
      state.savings = action.payload;
    },

    addSavingGoal(state, action) {
      state.savings.push(action.payload);
    },

    removeSavingGoal(state, action) {
      state.savings = state.savings.filter(
        (goal) => goal._id !== action.payload
      );
    },

    updateSavingGoals(state, action) {
      const updated = action.payload;
      const index = state.savings.findIndex((g) => g._id === updated._id);
      if (index !== -1) {
        state.savings[index] = updated;
      }
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  setSavings,
  addSavingGoal,
  removeSavingGoal,
  updateSavingGoals,
  setLoading,
} = savingSlice.actions;

export default savingSlice.reducer;
