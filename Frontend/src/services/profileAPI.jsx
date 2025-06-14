import { toast } from "react-hot-toast";
import { apiConnector } from "./apiconnector";
import { profileEndpoints } from "./apis";

const { UPDATE_PROFILE_API } = profileEndpoints;

export const updateProfileDetails = async (formData, token) => {
  const toastId = toast.loading("Updating profile...");
  let result = null;

  try {
    const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
      Authorization: `Bearer ${token}`,
    });

    result = response?.data;
    if (!result) throw new Error("Profile update failed");

    toast.success("Profile updated successfully");
  } catch (error) {
    console.error("Error updating profile:", error);
    toast.error(error?.response?.data?.message || error.message || "Update failed");
    throw error;
  } finally {
    toast.dismiss(toastId);
  }

  return result;
};
