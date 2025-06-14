import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector.jsx";
import { transactionEndpoints } from "../apis.jsx";
import { setLoading, setTransactions, removeTransaction, updateTransaction, setMonthlySummary, setPaginatedTransactions, addTransaction} from "../../slices/transactionSlice.jsx";
import { fetchCategories } from "./categoryAPI.jsx";
import { addCategory } from "../../slices/categorySlice.jsx";

const {
  GET_ALL_TRANSACTIONS_API,
  CREATE_TRANSACTION_API,
  DELETE_TRANSACTION_API,
  UPDATE_TRANSACTION_API,
  FILTER_TRANSACTIONS_API,
  GET_MONTHLY_SUMMARY_API,
  GET_PAGINATED_TRANSACTIONS_API,
} = transactionEndpoints;
export function fetchAllTransactions() {
  return async (dispatch) => {
    const toastId = toast.loading("Fetching transactions...");
    dispatch(setLoading(true));

    try {
      const response = await apiConnector(
        "GET",
        GET_ALL_TRANSACTIONS_API,
        null,
        {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        }
      );

        if (!response.data?.transactions) {
            throw new Error("Could Not Fetch Transactions");
        }


      dispatch(setTransactions(response.data.transactions));
      toast.success("Transactions loaded");
    } catch (error) {
      console.error("FETCH TRANSACTIONS ERROR:", error);
      const errorMessage =
        error.response?.data?.message || error.message || "Error fetching transactions";
      toast.error(errorMessage);
    }

    dispatch(setLoading(false));
    toast.dismiss(toastId);
  };
}

export function createTransaction(data) {
  return async (dispatch, getState) => {
    try {
      const res = await apiConnector(
        "POST",
        CREATE_TRANSACTION_API,
        data,
        {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        }
      );

      const transaction = res.data.transaction;
      dispatch(addTransaction(transaction));

      // 🔍 Check if the category already exists
      const state = getState();
      const categories = state.category.categories;
      const exists = categories.some(
        (cat) =>
          cat.name.toLowerCase() === transaction.category.toLowerCase() &&
          cat.type === transaction.type
      );

      if (!exists) {
        // ➕ Create new category if not exists
        dispatch(
          addCategory({
            name: transaction.category,
            totalSpent: transaction.amount,
            type: transaction.type,
          })
        );
      }

      toast.success("Transaction created");

    } catch (err) {
      console.error("CREATE TRANSACTION ERROR:", err);
      toast.error("Failed to create transaction");
    }
  };
}

export const deleteTransactionAPI = (id) => async (dispatch) => {
  const toastId = toast.loading("Deleting transaction...");
  const t = JSON.parse(localStorage.getItem("token"));
  try {
    const response = await apiConnector(
      "DELETE",
      DELETE_TRANSACTION_API,
      { id },
      {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      }
    );

    if (!response.data?.message) {
      throw new Error("Could not delete transaction");
    }

    dispatch(removeTransaction(id));
    dispatch(fetchCategories(t)); // refresh categories

    toast.success("Transaction deleted");
  } catch (err) {
    console.error("DELETE TRANSACTION ERROR:", err);
    toast.error(err.response?.data?.message || err.message || "Failed to delete transaction");
  } finally {
    toast.dismiss(toastId);
  }
};

export const updateTransactionAPI = (formData) => async (dispatch) => {
  const toastId = toast.loading("Updating transaction...");
  const t = JSON.parse(localStorage.getItem("token"));
  try {
    const response = await apiConnector(
      "PUT", // or "POST" if your backend expects POST
      UPDATE_TRANSACTION_API,
      formData,
      {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      }
    );

    if (!response.data?.transaction) {
      throw new Error("Failed to update transaction");
    }

    dispatch(updateTransaction(response.data.transaction));
    dispatch(fetchCategories(t)); // 🔄 Refresh category totals from backend

    toast.success("Transaction updated successfully");
  } catch (err) {
    console.error("UPDATE TRANSACTION ERROR:", err);
    toast.error(err.response?.data?.error || err.message || "Failed to update transaction");
  } finally {
    toast.dismiss(toastId);
  }
};

export const filterTransactionsAPI = (filters) => async (dispatch) => {
  try {
    const response = await apiConnector("POST", FILTER_TRANSACTIONS_API, filters);
    dispatch(setTransactions(response.data.transactions));
  } catch (error) {
    console.error("Error filtering transactions:", error);
    toast.error("Failed to filter transactions.");
  }
};

export const getMonthlySummaryAPI = (filters) => async (dispatch) => {
  try {
    const response = await apiConnector(
      "POST",
      GET_MONTHLY_SUMMARY_API,
      filters,
      {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      }
    );
    dispatch(setMonthlySummary(response.data.summary));
  } catch (error) {
    console.error("Error getting monthly summary:", error);
    toast.error("Failed to load monthly summary.");
  }
};


export const getPaginatedTransactionsAPI = (filters) => async (dispatch) => {
  try {
    const response = await apiConnector(
      "POST",
      GET_PAGINATED_TRANSACTIONS_API,
      filters,
      {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      }
    );

    dispatch(
      setPaginatedTransactions({
        transactions: response.data.transactions,
        total: response.data.total,
        page: response.data.page,
        pages: response.data.pages,
      })
    );
  } catch (error) {
    console.error("Error getting paginated transactions:", error);
    toast.error("Failed to load transactions.");
  }
};