import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecurringBills,
  createRecurringBill,
  deleteRecurringBill,
} from "../../../services/operations/recurringBillsAPI";

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

  const token = useSelector((state) => state.auth.token);
  if(!token) console.log("Token not present in google auth");
  useEffect(() => {
    if (token) {
      dispatch(fetchRecurringBills(token));
    }
  }, [dispatch, token]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) return;

    const newBill = await createRecurringBill({ ...formData }, token);

    if (newBill) {
      dispatch(fetchRecurringBills(token)); // Sync with backend
      setShowForm(false);
      setFormData({
        title: "",
        amount: "",
        dueDate: "",
        frequency: "monthly",
      });
    }
  };

  const handleDelete = async (id) => {
    if (!token) return;

    const confirm = window.confirm("Are you sure you want to delete this bill?");
    if (!confirm) return;

    try {
      await deleteRecurringBill(id, token);
      dispatch(fetchRecurringBills(token)); // Refresh list
    } catch (error) {
      console.error("Delete failed:", error);
    }
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
            className="col-span-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
          >
            Create Bill
          </button>
        </form>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {bills.map((bill) => (
            <div
              key={bill._id}
              className="bg-white p-4 rounded-xl shadow-md border border-gray-200 relative"
            >
              <h3 className="text-lg font-semibold">{bill.title}</h3>
              <p>Amount: ₹{bill.amount}</p>
              <p>Due: {new Date(bill.dueDate).toLocaleDateString()}</p>
              <p>Frequency: {bill.frequency}</p>

              <button
                onClick={() => handleDelete(bill._id)}
                className="mt-3 text-sm text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecurringBills;
