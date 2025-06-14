import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTransaction } from "../../../services/operations/transactionAPI";

const CreateTransactionForm = () => {
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    amount: "",
    description: "",
    category: "Food",
    type: "expense",
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formattedAmount = parseFloat(form.amount);
    if (isNaN(formattedAmount)) return;

    dispatch(createTransaction({ ...form, amount: formattedAmount }));

    // Optional: clear form
    setForm({
      amount: "",
      description: "",
      category: "Food",
      type: "expense",
      date: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 bg-white p-6 rounded-lg shadow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          placeholder="Amount"
          className="border p-2 rounded"
          required
        />
        <input
          name="description"
          type="text"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2 rounded"
          required
        />
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Income">Income</option>
        </select>
        <select
          name="type"
          value={form.type}
          onChange={handleChange}
          className="border p-2 rounded"
        >
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <input
          name="date"
          type="date"
          value={form.date}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add Transaction
      </button>
    </form>
  );
};

export default CreateTransactionForm;
