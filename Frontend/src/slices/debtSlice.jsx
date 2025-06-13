import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  debts: {}, // { debtId: { _id, user, friend, amount, ... } }
  loading: false,
  error: null,
};

const debtSlice = createSlice({
  name: "debt",
  initialState,
  reducers: {

    setDebts: (state, action) => {
      const debtMap = {};
      action.payload.forEach((debt) => {
        debtMap[debt._id] = debt;
      });
      state.debts = debtMap;
    },

    addDebt: (state, action) => {
      const debt = action.payload;
      state.debts[debt._id] = debt;
    },

    updateDebt: (state, action) => {
      const updatedDebt = action.payload;
      if (state.debts[updatedDebt._id]) {
        state.debts[updatedDebt._id] = updatedDebt;
      }
    },

    removeDebt: (state, action) => {
      const id = action.payload;
      delete state.debts[id];
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    
    setDebtError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setDebts,
  addDebt,
  updateDebt,
  removeDebt,
  setLoading,
  setDebtError,
} = debtSlice.actions;

export default debtSlice.reducer;
