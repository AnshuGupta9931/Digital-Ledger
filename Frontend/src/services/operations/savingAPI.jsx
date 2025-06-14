import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector.jsx";
import { savingEndpoints } from "../apis.jsx";

import {
  addSavingGoal,
  setLoading,
  setSavings,
  updateSavingGoals,
  removeSavingGoal,
} from "../../slices/savingSlice.jsx";

const {
  CREATE_SAVING_GOAL_API,
  GET_ALL_SAVINGS_API,
  UPDATE_SAVING_GOAL_API,
  DELETE_SAVING_API,
  ADD_TO_SAVING_API,
  SUB_FROM_SAVING_API,
} = savingEndpoints;

export const createSavingGoal = (data, token) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await apiConnector("POST", CREATE_SAVING_GOAL_API, data, {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    });

    dispatch(addSavingGoal(res.data.saving));
    toast.success("Saving goal created successfully");
  } catch (error) {
    console.error("CREATE SAVING GOAL ERROR:", error);
    toast.error("Failed to create saving goal");
  } finally {
    dispatch(setLoading(false));
  }
};

export const fetchSavings = (token) => async (dispatch) => {
  try {
    const res = await apiConnector("GET", GET_ALL_SAVINGS_API, null, {
      Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
    });

    dispatch(setSavings(res.data.savings));
  } catch (error) {
    console.error("FETCH SAVINGS ERROR:", error);
    toast.error("Failed to fetch savings");
  }
};

export const updateSavingGoal = ({ id, title, goalAmount, savedAmount, token }) => async (dispatch) => {
  try {
    const res = await apiConnector(
      "PUT",
      UPDATE_SAVING_GOAL_API,
      {
        id,
        title,
        goalAmount: Number(goalAmount),
        ...(savedAmount !== undefined && { savedAmount: Number(savedAmount) }),
      },
      {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      }
    );

    dispatch(updateSavingGoals(res.data.saving));
    toast.success("Saving goal updated successfully");
  } catch (error) {
    console.error("UPDATE SAVING GOAL ERROR:", error);
    toast.error(error?.response?.data?.message || "Failed to update saving goal");
  }
};

export const deleteSavingGoal = (id, token) => async (dispatch) => {
  try {
    await apiConnector(
      "DELETE",
      DELETE_SAVING_API,
      { id },
      {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      }
    );

    dispatch(removeSavingGoal(id));
    toast.success("Saving goal deleted successfully");
  } catch (error) {
    console.error("DELETE SAVING GOAL ERROR:", error);
    toast.error("Failed to delete saving goal");
  }
};

export const addToSavingGoal = (id, amount, token) => async (dispatch) => {
  try {
    const res = await apiConnector(
      "POST",
      ADD_TO_SAVING_API,
      { id, amount },
      {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      }
    );

    dispatch(updateSavingGoals(res.data.saving));
    toast.success("Amount added to savings!");
  } catch (error) {
    console.error("ADD TO SAVING ERROR:", error);
    toast.error("Failed to add amount to saving");
  }
};

export const subFromSavingGoal = (id, amount, token) => async (dispatch) => {
  try {
    const res = await apiConnector(
      "POST",
      SUB_FROM_SAVING_API,
      { id, amount },
      {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      }
    );

    dispatch(updateSavingGoals(res.data.saving));
    toast.success("Amount subtracted from savings!");
  } catch (error) {
    console.error("SUBTRACT FROM SAVING ERROR:", error);
    toast.error("Failed to subtract amount from saving");
  }
};
