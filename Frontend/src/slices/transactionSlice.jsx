import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  transactions: localStorage.getItem("transactions")
    ? JSON.parse(localStorage.getItem("transactions"))
    : [],
  totalIncome: localStorage.getItem("totalIncome")
    ? JSON.parse(localStorage.getItem("totalIncome"))
    : 0,
  totalExpense: localStorage.getItem("totalExpense")
    ? JSON.parse(localStorage.getItem("totalExpense"))
    : 0,
  filterCategory: "all",
  filterDateRange: { start: null, end: null },
  loading: false,
  monthlySummary: { income: 0, expense: 0 },
  total: 0,
  page: 1,
  pages: 1,
};

const recalculateTotals = (transactions) => {
  let income = 0;
  let expense = 0;

  transactions.forEach((tx) => {
    if (tx.type === "income") income += tx.amount;
    else expense += tx.amount;
  });

  return { income, expense };
};

const persistToLocalStorage = (state) => {
  localStorage.setItem("transactions", JSON.stringify(state.transactions));
  localStorage.setItem("totalIncome", JSON.stringify(state.totalIncome));
  localStorage.setItem("totalExpense", JSON.stringify(state.totalExpense));
};

const transactionSlice = createSlice({
  name: "transaction",
  initialState,
  reducers: {
    addTransaction: (state, action) => {
      let tx = action.payload;
      if (!tx._id) tx._id = uuidv4();
      if (tx.isSynced === undefined) tx.isSynced = false;

      state.transactions.push(tx);

      if (tx.type === "income") state.totalIncome += tx.amount;
      else state.totalExpense += tx.amount;

      persistToLocalStorage(state);
      toast.success("Transaction added");
    },

    removeTransaction: (state, action) => {
      const txId = action.payload;
      const index = state.transactions.findIndex((tx) => tx._id === txId);

      if (index !== -1) {
        const tx = state.transactions[index];

        if (tx.type === "income") {
          state.totalIncome -= tx.amount;
        } else {
          state.totalExpense -= tx.amount;
        }

        state.transactions.splice(index, 1);

        persistToLocalStorage(state);

      } else {
        toast.error("Transaction not found");
      }
    },

    updateTransaction: (state, action) => {
      const updated = action.payload;
      const index = state.transactions.findIndex((tx) => tx._id === updated._id);

      if (index >= 0) {
        const old = state.transactions[index];

        // Remove old amount
        if (old.type === "income") state.totalIncome -= old.amount;
        else state.totalExpense -= old.amount;

        // Update transaction
        state.transactions[index] = {
          ...updated,
          isSynced: updated.isSynced ?? false,
        };

        // Add new amount
        if (updated.type === "income") state.totalIncome += updated.amount;
        else state.totalExpense += updated.amount;

        persistToLocalStorage(state);
        toast.success("Transaction updated");
      } else {
        toast.error("Transaction not found");
      }
    },

    setTransactions: (state, action) => {
      state.transactions = action.payload.map((tx) => ({
        ...tx,
        isSynced: true,
      }));

      const { income, expense } = recalculateTotals(state.transactions);
      state.totalIncome = income;
      state.totalExpense = expense;

      persistToLocalStorage(state);
    },

    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload;
    },

    setFilterDateRange: (state, action) => {
      state.filterDateRange = action.payload;
    },

    resetTransactions: (state) => {
      state.transactions = [];
      state.totalIncome = 0;
      state.totalExpense = 0;

      localStorage.removeItem("transactions");
      localStorage.removeItem("totalIncome");
      localStorage.removeItem("totalExpense");

      toast.success("All transactions cleared");
    },

    debugSetSampleData: (state, action) => {
      const sample = action.payload;
      state.transactions = sample.map(tx => ({ ...tx, isSynced: false }));
      const { income, expense } = recalculateTotals(state.transactions);
      state.totalIncome = income;
      state.totalExpense = expense;
      persistToLocalStorage(state);
      toast.success("Sample data loaded");
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },

    setMonthlySummary: (state, action) => {
      state.monthlySummary = action.payload;
    },

    setPaginatedTransactions: (state, action) => {
      state.transactions = action.payload.transactions;
      state.total = action.payload.total;
      state.page = action.payload.page;
      state.pages = action.payload.pages;
    },

  },
});

export const {
  addTransaction,
  removeTransaction,
  resetTransactions,
  updateTransaction,
  setTransactions,
  debugSetSampleData,
  setFilterCategory,
  setFilterDateRange,
  setLoading,
  setMonthlySummary,
  setPaginatedTransactions,
} = transactionSlice.actions;

export default transactionSlice.reducer;
