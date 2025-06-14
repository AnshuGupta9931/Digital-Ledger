import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCategories,
  createCategory,
} from "../../../services/operations/categoryAPI";
import { addCategory } from "../../../slices/categorySlice"; // ✅ import this

export const Categories = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [categoryName, setCategoryName] = useState("");

  const categories = useSelector((state) => state.category?.categories || []);
  const loading = useSelector((state) => state.category?.loading || false);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    if (token) {
      dispatch(fetchCategories(token));
    }
  }, [token, dispatch]);

  const handleCreateCategory = async () => {
    if (!categoryName.trim()) return;

    const newCat = await createCategory({ name: categoryName }, token);

    if (newCat) {
      dispatch(addCategory(newCat)); // ✅ Instant update
      dispatch(fetchCategories(token)); // ✅ Sync with backend
      setCategoryName("");
      setShowModal(false);
    }
  };

  return (
    <div className="p-6 w-full bg-white min-h-screen relative">
      <button
        onClick={() => setShowModal(true)}
        className="bg-blue-900 text-white px-4 py-2 rounded-md mb-6 font-medium hover:bg-blue-800 transition"
      >
        + Add Category
      </button>

      <div className="grid grid-cols-2 gap-4 font-semibold text-gray-700 border-b pb-2 mb-2">
        <div>Category</div>
        <div>Expense</div>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading...</div>
      ) : (
        <div className="flex flex-col gap-4">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="grid grid-cols-2 items-center text-gray-800"
            >
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                <span>{cat.name}</span>
              </div>
              <div className="text-right">
                ${cat.totalSpent?.toLocaleString() || 0}
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 backdrop-blur-sm bg-white/10 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-80">
            <h2 className="text-lg font-semibold mb-4">Create Category</h2>
            <input
              type="text"
              placeholder="Category name"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full border px-3 py-2 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateCategory}
                className="px-4 py-2 rounded-md bg-blue-900 text-white hover:bg-blue-800"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Categories;
