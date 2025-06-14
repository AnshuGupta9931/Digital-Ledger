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


export const createSavingGoal  = (data) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await apiConnector("POST", CREATE_SAVING_GOAL_API, data, {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });

      const saving = res.data.saving;
      dispatch(addSavingGoal(saving));

      toast.success("Saving goal created successfully");
    } catch (error) {
      console.error("CREATE SAVING GOAL ERROR:", error);
      toast.error("Failed to create saving goal");
    }
    finally{
        dispatch(setLoading(false));
    }
};

export const fetchSavings = () => async (dispatch) => {
    try {
      const res = await apiConnector("GET", GET_ALL_SAVINGS_API, null, {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      });

      const savings = res.data.savings;
      dispatch(setSavings(savings));
    } catch (error) {
      console.error("FETCH SAVINGS ERROR:", error);
      toast.error("Failed to fetch savings");
    }
};

export function updateSavingGoal({ id, title, goalAmount, savedAmount }) {
  return async (dispatch) => {
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
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      );

      const updatedSaving = res.data.saving;

      dispatch(updateSavingGoals(updatedSaving));
      toast.success("Saving goal updated successfully");
    } catch (error) {
      console.error("UPDATE SAVING GOAL ERROR:", error);
      toast.error(error?.response?.data?.message || "Failed to update saving goal");
    }
  };
}


export function deleteSavingGoal(id) {
  return async (dispatch) => {
    try {
      const res = await apiConnector(
        "DELETE",
        DELETE_SAVING_API,
        { id },
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      );

      dispatch(removeSavingGoal(id));
      toast.success("Saving goal deleted successfully");
    } catch (error) {
      console.error("DELETE SAVING GOAL ERROR:", error);
      toast.error("Failed to delete saving goal");
    }
  };
}

export function addToSavingGoal(id, amount) {
  return async (dispatch) => {
    try {
      const res = await apiConnector(
        "POST",
        ADD_TO_SAVING_API,
        { id, amount },
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      );

      const updatedSaving = res.data.saving;
      dispatch(updateSavingGoals(updatedSaving));
      toast.success("Amount added to savings!");
    } catch (error) {
      console.error("ADD TO SAVING ERROR:", error);
      toast.error("Failed to add amount to saving");
    }
  };
}

export function subFromSavingGoal(id, amount) {
  return async (dispatch) => {
    try {
      const res = await apiConnector(
        "POST",
        SUB_FROM_SAVING_API,
        { id, amount },
        {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      );

      const updatedSaving = res.data.saving;
      dispatch(updateSavingGoals(updatedSaving));
      toast.success("Amount subtracted from savings!");
    } catch (error) {
      console.error("SUBTRACT FROM SAVING ERROR:", error);
      toast.error("Failed to subtract amount from saving");
    }
  };
}
