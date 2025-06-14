import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    loading: false,
    error: null,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    resetCategoryState: (state) => {
      state.categories = [];
      state.loading = false;
      state.error = null;
    },

    // ✅ New reducer: addCategory
    addCategory: (state, action) => {
      const newCategory = action.payload;

      const exists = state.categories.some(
        (cat) =>
          cat.name.toLowerCase() === newCategory.name.toLowerCase() &&
          cat.type === newCategory.type
      );

      if (!exists) {
        state.categories.push(newCategory);
        toast.success(`Category "${newCategory.name}" added`);
      }
    },
    
  },

  // Uncomment and use extraReducers if using async thunks like createCategory or fetchCategories
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(createCategory.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(createCategory.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.categories.push(action.payload);
  //     })
  //     .addCase(createCategory.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     })
  //     .addCase(fetchCategories.pending, (state) => {
  //       state.loading = true;
  //     })
  //     .addCase(fetchCategories.fulfilled, (state, action) => {
  //       state.loading = false;
  //       state.categories = action.payload;
  //     })
  //     .addCase(fetchCategories.rejected, (state, action) => {
  //       state.loading = false;
  //       state.error = action.payload;
  //     });
  // },
});

export const {
  setCategories,
  setLoading,
  resetCategoryState,
  addCategory, // ✅ export it
} = categorySlice.actions;

export default categorySlice.reducer;
