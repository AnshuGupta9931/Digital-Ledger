import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const recurringBillsSlice = createSlice({
  name: "recurringBills",
  initialState: {
    bills: [],
    currentBill: null,
    loading: false,
    error: null,
  },

  reducers: {
    setBills: (state, action) => {
      state.bills = action.payload;
    },

    setCurrentBill: (state, action) => {
      state.currentBill = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    },

    resetBillState: (state) => {
      state.bills = [];
      state.currentBill = null;
      state.loading = false;
      state.error = null;
    },

    addBill: (state, action) => {
      const newBill = action.payload;
      const exists = state.bills.some(
        (bill) =>
          bill.name.toLowerCase() === newBill.name.toLowerCase() &&
          bill.amount === newBill.amount
      );

      if (!exists) {
        state.bills.push(newBill);
        console.log("New Bill was : " ,newBill);
        toast.success(`Bill ${newBill.name} added`);
      } else {
        toast.error(`Bill ${newBill.name} already exists`);
      }
    },

    updateBill: (state, action) => {
      const updatedBill = action.payload;
      const index = state.bills.findIndex((b) => b._id === updatedBill._id);
      if (index !== -1) {
        state.bills[index] = updatedBill;
        toast.success(`Bill "${updatedBill.name}" updated`);
      }
    },

    deleteBill: (state, action) => {
      const idToDelete = action.payload;
      state.bills = state.bills.filter((bill) => bill._id !== idToDelete);
      toast.success("Bill deleted");
    },
  },
});

export const {
  setBills,
  setCurrentBill,
  setLoading,
  setError,
  resetBillState,
  addBill,
  updateBill,
  deleteBill,
} = recurringBillsSlice.actions;

export default recurringBillsSlice.reducer;
