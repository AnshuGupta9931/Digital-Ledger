import React from "react";

const transactions = [
  {
    date: "04/22/2024",
    name: "Groceries",
    amount: -150,
    category: "Food",
    categoryColor: "bg-teal-100 text-teal-800",
  },
  {
    date: "04/22/2024",
    name: "Salary",
    amount: 5000,
    category: "Income",
    categoryColor: "bg-green-100 text-green-800",
  },
  {
    date: "04/22/2024",
    name: "Online Shopping",
    amount: -200,
    category: "Shopping",
    categoryColor: "bg-orange-100 text-orange-800",
  },
  {
    date: "04/22/2024",
    name: "Cinema",
    amount: -40,
    category: "Entertainment",
    categoryColor: "bg-cyan-100 text-cyan-800",
  },
];

export const Transactions = () => {
  return (
    <div className="p-6 w-full bg-white min-h-screen">
      {transactions.map((tx, index) => (
        <div
          key={index}
          className="bg-[#fffaf3] p-4 mb-4 rounded-lg shadow-sm border border-gray-200"
        >
          <p className="text-sm text-gray-500 mb-1">{tx.date}</p>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-gray-800">{tx.name}</p>
              <span
                className={`inline-block px-2 py-1 mt-1 text-xs rounded ${tx.categoryColor}`}
              >
                {tx.category}
              </span>
            </div>
            <p
              className={`text-lg font-bold ${
                tx.amount >= 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {tx.amount >= 0 ? `$${tx.amount.toFixed(2)}` : `-$${Math.abs(tx.amount).toFixed(2)}`}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};