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
    <div className="p-6 w-full bg-white min-h-screen">
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-5xl mx-auto">
        <div className="text-orange-600 font-bold text-sm mb-1">BALANCE</div>
        <div className="text-4xl font-bold text-gray-900 mb-6">$2,300.00</div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="bg-green-100 p-4 rounded-md flex-1">
            <div className="text-green-800 text-sm">Income</div>
            <div className="text-2xl font-bold text-gray-900">$5,000.00</div>
          </div>
          <div className="bg-red-100 p-4 rounded-md flex-1">
            <div className="text-red-600 text-sm">Expenses</div>
            <div className="text-2xl font-bold text-red-600">$2,700.00</div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div>
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

        <div className="mt-8">
          <div className="text-xl font-semibold mb-2">Recent Transactions</div>
          <ul className="text-md text-gray-700 space-y-1">
            <li>Groceries</li>
            <li>Rent</li>
            <li>Movies</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
