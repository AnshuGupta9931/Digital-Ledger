import { apiConnector } from "./apiconnector";
import { endpoints } from "./apis";

const { UPDATE_PROFILE_API } = endpoints;

export const updateProfileDetails = async (formData, token) => {
  try {
    const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
      Authorization: `Bearer ${token}`,
    });

    return response?.data;
  } catch (error) {
    console.error("Error updating profile:", error);
    throw error;
  }
};
