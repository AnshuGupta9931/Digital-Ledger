import { apiConnector } from "../apiconnector.jsx";
import { groupEndpoints } from "../apis.jsx";
import { toast } from "react-hot-toast";
import {
  setLoading,
  setGroups,
  addGroup,
  setCurrentGroup,
  updateGroupInList,
  removeGroup,
} from "../../slices/groupSlice";

const {
  CREATE_GROUP_API,
  GET_USER_GROUPS_API,
  GET_GROUP_BY_ID_API,
  UPDATE_GROUP_API,
  DELETE_GROUP_API,
} = groupEndpoints;

// CREATE group
export const createGroupAPI = ({ name, members }) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await apiConnector("POST", CREATE_GROUP_API, { name, members });
    toast.success("Group created successfully");
    // Instead of manually adding (which lacks populated members), refetch:
    dispatch(fetchUserGroupsAPI());
  } catch (err) {
    toast.error(err?.response?.data?.error || "Failed to create group");
  } finally {
    dispatch(setLoading(false));
  }
};


// GET all groups for user
export const fetchUserGroupsAPI = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await apiConnector("GET", GET_USER_GROUPS_API);
    dispatch(setGroups(res.data.groups));
  } catch (err) {
    toast.error(err?.response?.data?.error || "Failed to fetch groups");
  } finally {
    dispatch(setLoading(false));
  }
};

// GET group by ID
export const fetchGroupByIdAPI = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await apiConnector("POST", GET_GROUP_BY_ID_API, { id });
    dispatch(setCurrentGroup(res.data.group));
  } catch (err) {
    toast.error(err?.response?.data?.error || "Failed to load group");
  } finally {
    dispatch(setLoading(false));
  }
};

// UPDATE group
export const updateGroupAPI = ({ id, name, members }) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await apiConnector("PUT", UPDATE_GROUP_API, { id, name, members });
    toast.success("Group updated");
    dispatch(fetchUserGroupsAPI());
  } catch (err) {
    toast.error(err?.response?.data?.error || "Failed to update group");
  } finally {
    dispatch(setLoading(false));
  }
};


// DELETE group
export const deleteGroupAPI = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    await apiConnector("DELETE", DELETE_GROUP_API, { id });
    toast.success("Group deleted");
    dispatch(removeGroup(id));
  } catch (err) {
    toast.error(err?.response?.data?.error || "Failed to delete group");
  } finally {
    dispatch(setLoading(false));
  }
};
