import React from "react";
import { useSelector } from "react-redux";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const COLORS = [
  "#3b82f6", "#22c55e", "#f97316", "#8b5cf6", "#ef4444", "#14b8a6",
  "#eab308", "#ec4899", "#0ea5e9", "#7c3aed", "#f43f5e", "#10b981"
];

export const DashboardHome = () => {
  const { transactions } = useSelector((state) => state.transaction);

  let income = 0;
  let expenses = 0;
  let transactionCount = 0;
  let highest = 0;
  const dailyTotals = {};
  const categoryMap = {};

  transactions.forEach((tx) => {
    transactionCount++;
    if (tx.amount > highest) highest = tx.amount;
    const date = new Date(tx.date).toLocaleDateString("en-IN", { month: "short", day: "numeric" });

    if (tx.type === "income") {
      income += tx.amount;
    } else {
      expenses += tx.amount;
      categoryMap[tx.category || "Other"] = (categoryMap[tx.category || "Other"] || 0) + tx.amount;
      dailyTotals[date] = (dailyTotals[date] || 0) + tx.amount;
    }
  });

  const balance = income - expenses;

  const pieChartData = Object.entries(categoryMap).map(([name, value], i) => ({
    name,
    value,
    color: COLORS[i % COLORS.length],
  }));

  const lineChartData = Object.entries(dailyTotals).map(([date, amount]) => ({
    date,
    amount
  }));

  return (
    <div className="min-h-screen bg-[#fefcf8] p-6 text-gray-800">
      <header className="mb-6 text-2xl font-semibold text-gray-900">Welcome back 👋</header>

      {/* Overview Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white p-4 rounded-2xl shadow">
          <div className="text-sm text-orange-600">Balance</div>
          <div className="text-2xl font-bold">${balance.toFixed(2)}</div>
        </div>
        <div className="bg-green-100 p-4 rounded-2xl shadow">
          <div className="text-sm text-green-800">Income</div>
          <div className="text-xl font-bold">${income.toFixed(2)}</div>
        </div>
        <div className="bg-red-100 p-4 rounded-2xl shadow">
          <div className="text-sm text-red-600">Expenses</div>
          <div className="text-xl font-bold">${expenses.toFixed(2)}</div>
        </div>
        <div className="bg-purple-100 p-4 rounded-2xl shadow">
          <div className="text-sm text-purple-700">Transactions</div>
          <div className="text-xl font-bold">{transactionCount}</div>
        </div>
      </div>

      {/* Pie + Summary */}
      <div className="grid lg:grid-cols-2 gap-6 mb-10">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Expense Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={index} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-4">Top Categories</h2>
          <ul className="space-y-2">
            {pieChartData.map((item, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span>{item.name}</span>
                <span className="ml-auto font-semibold">${item.value.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Trend Line Chart */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">
        <h2 className="text-lg font-semibold mb-4">Spending Trend</h2>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={lineChartData}>
            <XAxis dataKey="date" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Line type="monotone" dataKey="amount" stroke="#ef4444" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
        <ul className="divide-y divide-gray-200">
          {transactions.slice(0, 5).map((tx, i) => (
            <li key={i} className="py-2 flex justify-between">
              <span>{tx.type === "income" ? "💰" : "💸"} {tx.category || "Unknown"}</span>
              <span className={tx.type === "income" ? "text-green-600" : "text-red-600"}>${tx.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DashboardHome;
