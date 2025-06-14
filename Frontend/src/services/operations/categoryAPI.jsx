import { toast } from "react-hot-toast";
import { apiConnector } from "../apiconnector.jsx";
import { categoryEndpoints } from "../apis.jsx";
import { setCategories, setLoading } from "../../slices/categorySlice.jsx"; // ← also import setLoading

const {
    CREATE_CATEGORY_API,
    GET_ALL_CATEGORY_API,
} = categoryEndpoints;

export const createCategory = async (data, token) => {
  let result = null;
  const toastId = toast.loading("Creating category...");

  try {
    const response = await apiConnector("POST", CREATE_CATEGORY_API, data, {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    });

    console.log("CREATE CATEGORY RESPONSE:", response);

    if (!response?.data?.category) {
      throw new Error("Could not create category");
    }

    toast.success("Category Created Successfully");
    result = response.data.category;
  } catch (error) {
    console.error("CREATE CATEGORY ERROR:", error);
    toast.error(error.message || "Could not create category");
  }

  toast.dismiss(toastId);
  return result;
};

// ✅ Correct way to define a thunk
// categoryAPI.jsx
export const fetchCategories = (token) => async (dispatch) => {
  const toastId = toast.loading("Fetching categories...");
  dispatch(setLoading(true));

  try {
    const response = await apiConnector(
      "POST",
      GET_ALL_CATEGORY_API,
      null,
      {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      }
    );

    if (!response.data?.categories) {
      throw new Error("Could not fetch categories");
    }

    dispatch(setCategories(response.data.categories));
    toast.success("Categories loaded");
  } catch (error) {
    console.error("FETCH CATEGORIES ERROR:", error);
    const errorMessage =
      error.response?.data?.message || error.message || "Error fetching categories";
    toast.error(errorMessage);
  }

  dispatch(setLoading(false));
  toast.dismiss(toastId);
};
