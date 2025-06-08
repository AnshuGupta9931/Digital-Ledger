import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBills, createBill } from "../../../slices/recurringBillsSlice";

export const RecurringBills = () => {
  const dispatch = useDispatch();
  const { bills, loading, error } = useSelector((state) => state.recurringBills);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    dueDate: "",
    frequency: "monthly",
  });

  useEffect(() => {
    dispatch(fetchAllBills());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createBill(formData)).then(() => {
      dispatch(fetchAllBills()); // refresh list after adding
      setShowForm(false);
      setFormData({ title: "", amount: "", dueDate: "", frequency: "monthly" });
    });
  };

  return (
    <div className="w-full min-h-screen bg-[#fefcf8] p-10 text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-[#162028] transition"
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? "Cancel" : "+ Add Bill"}
        </button>
      </div>

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-6 p-4 bg-white rounded-2xl shadow transition-all grid gap-4 md:grid-cols-2"
        >
          <input
            name="title"
            type="text"
            placeholder="Bill title"
            value={formData.title}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />
          <input
            name="amount"
            type="number"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />
          <input
            name="dueDate"
            type="date"
            value={formData.dueDate}
            onChange={handleChange}
            className="border rounded px-3 py-2"
            required
          />
          <select
            name="frequency"
            value={formData.frequency}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button
            type="submit"
            className="col-span-2 bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Submit
          </button>
        </form>
      )}

      <div className="bg-white rounded-2xl shadow transition-all p-4 overflow-x-auto">
        {loading ? (
          <p className="text-center py-6 text-blue-600 font-semibold">Loading bills...</p>
        ) : error ? (
          <p className="text-center py-6 text-red-500 font-medium">{error}</p>
        ) : bills.length === 0 ? (
          <p className="text-center py-6 text-gray-500">No bills found.</p>
        ) : (
          <table className="w-full table-auto text-left">
            <thead>
              <tr className="border-b text-sm text-gray-600 uppercase">
                <th className="px-4 py-2">Bill</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Due Date</th>
                <th className="px-4 py-2">Frequency</th>
              </tr>
            </thead>
            <tbody>
              {bills.map((bill) => (
                <tr key={bill._id} className="border-b last:border-none text-md">
                  <td className="px-4 py-3">{bill.title}</td>
                  <td className="px-4 py-3">₹{Number(bill.amount).toFixed(2)}</td>
                  <td className="px-4 py-3">{new Date(bill.dueDate).toDateString()}</td>
                  <td className="px-4 py-3 capitalize">{bill.frequency}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
