import React from "react";
import { FiPlus } from "react-icons/fi";

const savingsData = [
  {
    id: 1,
    goal: "Vacation Fund",
    saved: 1200,
    target: 2000,
  },
  {
    id: 2,
    goal: "Emergency Fund",
    saved: 800,
    target: 1000,
  },
];

export const Savings = () => {
  return (
    <div className="min-h-screen w-full bg-[#fefcf8] p-10 text-gray-800">
      {/* Page Title */}
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#234E70] mb-2">My Savings Goals</h1>
        <p className="text-[#6B7280] font-medium">
          Track your goals and stay on top of your financial progress.
        </p>
      </div>

      {/* Add Goal Button */}
      <div className="mb-8">
        <button className="flex items-center gap-2 bg-gradient-to-r from-[#4facfe] to-[#00f2fe] hover:from-[#3aa0fe] hover:to-[#00e2fe] px-6 py-2.5 rounded-full text-white font-semibold shadow-lg transition duration-200">
          <FiPlus className="text-lg" />
          Add Saving Goal
        </button>
      </div>

      {/* Savings Cards */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {savingsData.map((item) => {
          const percentage = Math.min((item.saved / item.target) * 100, 100);
          return (
            <div
              key={item.id}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300"
            >
              <h2 className="text-xl font-semibold text-[#1E3A8A] mb-2">
                {item.goal}
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                <span className="font-semibold text-[#2563EB]">
                  ${item.saved.toLocaleString()}
                </span>{" "}
                saved of{" "}
                <span className="text-gray-800">
                  ${item.target.toLocaleString()}
                </span>
              </p>

              {/* Progress Bar */}
              <div className="w-full bg-[#E5E7EB] h-3 rounded-full mb-2">
                <div
                  className="bg-gradient-to-r from-[#60a5fa] to-[#3b82f6] h-3 rounded-full transition-all duration-500 ease-in-out"
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="text-xs text-right text-gray-500">
                {percentage.toFixed(1)}% complete
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
