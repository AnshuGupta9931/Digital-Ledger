import React from "react";

const categories = [
  { name: "Food", amount: 1000, color: "bg-blue-600" },
  { name: "Shopping", amount: 900, color: "bg-emerald-700" },
  { name: "Entertainment", amount: 500, color: "bg-orange-500" },
  { name: "Other", amount: 300, color: "bg-purple-500" },
];

const Categories = () => {
  return (
    <div className="p-6 w-full bg-white min-h-screen">

      <button className="bg-blue-900 text-white px-4 py-2 rounded-md mb-6 font-medium hover:bg-blue-800 transition">
        + Add Category
      </button>

      <div className="grid grid-cols-2 gap-4 font-semibold text-gray-700 border-b pb-2 mb-2">
        <div>Category</div>
        <div>Expense</div>
      </div>

      <div className="flex flex-col gap-4">
        {categories.map((cat, index) => (
          <div key={index} className="grid grid-cols-2 items-center text-gray-800">
            <div className="flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full ${cat.color}`}></span>
              <span>{cat.name}</span>
            </div>
            <div className="text-right">${cat.amount.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
