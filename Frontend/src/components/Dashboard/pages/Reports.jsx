import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend
} from "recharts";

// Sample data
const categoryData = [
  { category: "Food", amount: 300 },
  { category: "Rent", amount: 1200 },
  { category: "Transport", amount: 150 },
  { category: "Entertainment", amount: 200 },
  { category: "Shopping", amount: 400 },
];

const dailyData = [
  { day: "Mon", savings: 50, expenses: 120 },
  { day: "Tue", savings: 70, expenses: 90 },
  { day: "Wed", savings: 30, expenses: 140 },
  { day: "Thu", savings: 90, expenses: 80 },
  { day: "Fri", savings: 60, expenses: 110 },
  { day: "Sat", savings: 100, expenses: 130 },
  { day: "Sun", savings: 80, expenses: 100 },
];

export const Reports = () => {
  return (
    <div className="p-6 w-full bg-white min-h-screen">
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-5xl mx-auto">

        {/* Bar Chart */}
        <div className="bg-orange-50 p-4 rounded-xl mb-8">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={categoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#f97316" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Line Chart */}
        <div className="bg-orange-50 p-4 rounded-xl">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={dailyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="savings" stroke="#10b981" strokeWidth={2} />
              <Line type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

