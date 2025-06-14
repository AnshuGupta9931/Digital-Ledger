import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector.jsx";
import { recurringBillsEndpoints } from "../apis.jsx";
import {
  setBills,
  setLoading,
  setError,
  addBill,
  updateBill,
  deleteBill,
  setCurrentBill,
} from "../../slices/recurringBillsSlice.jsx";

const {
  CREATE_BILL_API,
  GET_ALL_BILLS_API,
  UPDATE_BILL_API,
  DELETE_BILL_API,
  GET_BILL_BY_ID_API,
} = recurringBillsEndpoints;

// ✅ Create Recurring Bill — plain async function (not a thunk)
export const createRecurringBill = async (data, t) => {
  const toastId = toast.loading("Creating recurring bill...");
  let result = null;

  try {
    const response = await apiConnector("POST", CREATE_BILL_API, data, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    });
    console.log("Resonponse in RRApi.jsx",response);
    const bill = response?.data;
    if (!bill) throw new Error("Could not create recurring bill");

    toast.success("Recurring bill created successfully");
    result = bill;
  } catch (error) {
    console.error("CREATE BILL ERROR:", error);
    toast.error(error?.response?.data?.message || error.message);
  } finally {
    toast.dismiss(toastId);
  }

  return result;
};

// ✅ Fetch All Recurring Bills — thunk
export const fetchRecurringBills = (token) => async (dispatch) => {
  const toastId = toast.loading("Fetching recurring bills...");
  dispatch(setLoading(true));

  try {
    const response = await apiConnector("GET", GET_ALL_BILLS_API, null, {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    });

    const bills = response?.data;
    if (!bills) throw new Error("Could not fetch recurring bills");

    dispatch(setBills(bills));
    toast.success("Recurring bills loaded");
  } catch (error) {
    console.error("FETCH BILLS ERROR:", error);
    const message =
      error?.response?.data?.message || error.message || "Error fetching bills";
    dispatch(setError(message));
    toast.error(message);
  } finally {
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
};

// ✅ Update Recurring Bill — plain async function
export const updateRecurringBill = async (data, token) => {
  const toastId = toast.loading("Updating bill...");
  let result = null;

  try {
    const response = await apiConnector("PUT", UPDATE_BILL_API, data, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    });

    const updatedBill = response?.data;
    if (!updatedBill) throw new Error("Could not update bill");

    toast.success("Bill updated successfully");
    result = updatedBill;
  } catch (error) {
    console.error("UPDATE BILL ERROR:", error);
    toast.error(error?.response?.data?.message || error.message);
  } finally {
    toast.dismiss(toastId);
  }

  return result;
};

// ✅ Delete Recurring Bill — plain async function
export const deleteRecurringBill = async (id, token) => {
  const toastId = toast.loading("Deleting bill...");
  let success = false;

  try {
    const response = await apiConnector("DELETE", DELETE_BILL_API, {id}, {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    });
    console.log("Response in deleter : ",response);
    toast.success("Bill deleted successfully");
    success = true;
  } catch (error) {
    console.error("DELETE BILL ERROR:", error);
    toast.error(error?.response?.data?.message || error.message);
  } finally {
    toast.dismiss(toastId);
  }

  return success;
};

// ✅ Get Recurring Bill by ID — thunk
export const getRecurringBillById = (id, token) => async (dispatch) => {
  const toastId = toast.loading("Fetching bill...");
  dispatch(setLoading(true));

  try {
    const response = await apiConnector("GET", `${GET_BILL_BY_ID_API}/${id}`, null, {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    });

    const bill = response?.data;
    if (!bill) throw new Error("Could not find bill");

    dispatch(setCurrentBill(bill));
    toast.success("Bill fetched");
  } catch (error) {
    console.error("GET BILL BY ID ERROR:", error);
    toast.error(error?.response?.data?.message || error.message);
  } finally {
    dispatch(setLoading(false));
    toast.dismiss(toastId);
  }
};
