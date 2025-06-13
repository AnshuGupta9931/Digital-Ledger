import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector.jsx";
import { debtEndpoints } from "../apis.jsx";
import { addDebt, setLoading, setDebts, updateDebt, removeDebt} from "../../slices/debtSlice.jsx";

const {
    CREATE_DEBT_API,
    GET_DEBTS_API,
    SETTLE_DEBT_API,
    DELETE_DEBT_API,
} = debtEndpoints

export const createDebtAPI = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await apiConnector(
      "POST",
      CREATE_DEBT_API,
      data,
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    );

    const newDebt = res.data.debt;
    dispatch(addDebt(newDebt));

    toast.success("Debt created successfully");
  } catch (err) {
    console.error("CREATE DEBT ERROR:", err);
    toast.error("Failed to create debt");
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchDebtsAPI = () => async (dispatch) => {
  try {
    const res = await apiConnector(
      "GET",
      GET_DEBTS_API,
      null,
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    );

    const debts = res.data;
    dispatch(setDebts(debts));
  } catch (err) {
    console.error("FETCH DEBTS ERROR:", err);
    toast.error("Failed to fetch debts");
  }
};

export const settleDebtAPI = (id) => async (dispatch) => {
  try {
    const res = await apiConnector(
      "PUT",
      SETTLE_DEBT_API,
      { id },
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    );

    const updatedDebt = res.data.debt;
    dispatch(updateDebt(updatedDebt));

    toast.success("Debt settled successfully");
  } catch (err) {
    console.error("SETTLE DEBT ERROR:", err);
    toast.error("Failed to settle debt");
  }
};

export const deleteDebtAPI = (id) => async (dispatch) => {
  try {
    const res = await apiConnector(
      "DELETE",
      DELETE_DEBT_API,
      { id },
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    );

    const deletedDebt = res.data.debt;
    dispatch(removeDebt(deletedDebt._id)); // Assuming you have removeDebt action that removes debt by id

    toast.success("Debt deleted successfully");
  } catch (err) {
    console.error("DELETE DEBT ERROR:", err);
    toast.error("Failed to delete debt");
  }
};




