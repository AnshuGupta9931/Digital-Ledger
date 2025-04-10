import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const pieData = [
  { name: "Food", value: 400, color: "#3b82f6" },
  { name: "Shopping", value: 300, color: "#22c55e" },
  { name: "Entertainment", value: 200, color: "#f97316" },
  { name: "Other", value: 100, color: "#8b5cf6" },
];

export const DashboardHome = () => {
  return (
    <div className="w-full bg-[#fefcf8] p-10 text-gray-800 min-h-screen">
      <div className="bg-white rounded-2xl shadow-[0_10px_30px_rgba(0,0,0,0.05)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.1)] transition-all duration-300 p-6 w-full max-w-5xl mx-auto">

        {/* Balance Header */}
        <div className="text-orange-600 font-bold text-sm mb-1">BALANCE</div>
        <div className="text-4xl font-bold text-gray-900 mb-6">$2,300.00</div>

        {/* Income & Expenses with glow */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="bg-green-100 p-4 rounded-xl flex-1 shadow-[0_8px_30px_rgba(34,197,94,0.3)] transition-all duration-300 hover:shadow-[0_10px_35px_rgba(34,197,94,0.4)]">
            <div className="text-green-800 text-sm">Income</div>
            <div className="text-2xl font-bold text-gray-900">$5,000.00</div>
          </div>
          <div className="bg-red-100 p-4 rounded-xl flex-1 shadow-[0_8px_30px_rgba(239,68,68,0.3)] transition-all duration-300 hover:shadow-[0_10px_35px_rgba(239,68,68,0.4)]">
            <div className="text-red-600 text-sm">Expenses</div>
            <div className="text-2xl font-bold text-red-600">$2,700.00</div>
          </div>
        </div>

        {/* Summary + Pie Chart side-by-side (original orientation) */}
        <div className="flex flex-col lg:flex-row gap-8 mb-6">
          {/* Summary List with subtle glow */}
          <div className="bg-white rounded-xl p-4 w-full lg:w-1/3 shadow-[0_6px_25px_rgba(59,130,246,0.1)] hover:shadow-[0_8px_30px_rgba(59,130,246,0.2)] transition-all duration-300">
            <div className="text-xl font-semibold mb-2">Summary</div>
            <ul className="text-md space-y-2">
              {pieData.map((item) => (
                <li key={item.name} className="flex items-center space-x-2">
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span>{item.name}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pie Chart with glow */}
          <div className="bg-white rounded-xl p-4 w-full lg:w-2/3 shadow-[0_6px_25px_rgba(139,92,246,0.15)] hover:shadow-[0_8px_30px_rgba(139,92,246,0.25)] transition-all duration-300">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Transactions */}
        <div>
          <div className="text-xl font-semibold mb-2">Recent Transactions</div>
          <ul className="text-md text-gray-700 space-y-1 bg-gray-50 p-4 rounded-lg shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
            <li>🛒 Groceries</li>
            <li>🏠 Rent</li>
            <li>🎬 Movies</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
