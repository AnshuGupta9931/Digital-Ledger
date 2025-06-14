import React, { useEffect } from "react";
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
  Legend,
} from "recharts";

import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../../../services/operations/categoryAPI.jsx";
import { fetchAllTransactions } from "../../../services/operations/transactionAPI.jsx";
import { setLoading } from "../../../slices/transactionSlice.jsx";

// Utility function to group daily savings vs expenses
const getDailyData = (transactions) => {
  const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const result = weekDays.map((day) => ({
    day,
    savings: 0,
    expenses: 0,
  }));

  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    const dayIndex = date.getDay(); // 0 (Sun) to 6 (Sat)
    const dayName = weekDays[(dayIndex + 6) % 7]; // shift to Mon-Sun

    const target = result.find((d) => d.day === dayName);
    if (tx.type === "income") {
      target.savings += tx.amount;
    } else {
      target.expenses += tx.amount;
    }
  });

  return result;
};

export const Reports = () => {
  const dispatch = useDispatch();

  const { categories } = useSelector((state) => state.category);
  const { transactions, loading } = useSelector((state) => state.transaction);
  const token = useSelector((state)=>state.auth.token);
  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(fetchCategories(token));
    dispatch(fetchAllTransactions());
  }, [dispatch]);

  // Dynamic data for charts
  const categoryData = categories.map((cat) => ({
    category: cat.name,
    amount: cat.totalSpent || 0,
  }));

  const dailyData = getDailyData(transactions);

  return (
    <div className="p-6 w-full bg-white min-h-screen">
      <div className="bg-white rounded-2xl shadow-md p-6 w-full max-w-5xl mx-auto">

        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-700">Reports & Insights</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading reports...</p>
        ) : (
          <>
            {/* Bar Chart */}
            <div className="bg-orange-50 p-4 rounded-xl mb-8">
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Spending by Category</h3>
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
              <h3 className="text-lg font-semibold text-gray-600 mb-2">Daily Savings vs Expenses</h3>
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
          </>
        )}
      </div>
    </div>
  );
};
