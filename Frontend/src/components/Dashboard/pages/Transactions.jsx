import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPaginatedTransactionsAPI,
  deleteTransactionAPI,
  getMonthlySummaryAPI,
} from "../../../services/operations/transactionAPI.jsx";
import {
  setFilterCategory,
  setFilterDateRange,
} from "../../../slices/transactionSlice.jsx";
import CreateTransactionForm from "../TransactionComponents/CreateTransactionForm.jsx";
import { MdDelete, MdEdit } from "react-icons/md";

export const Transactions = () => {
  const dispatch = useDispatch();
  const {
    transactions,
    filterCategory,
    filterDateRange,
    monthlySummary,
    pages,
  } = useSelector((state) => state.transaction);

  const [showModal, setShowModal] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const income = monthlySummary?.income || 0;
  const expense = monthlySummary?.expense || 0;

  useEffect(() => {
    dispatch(
      getPaginatedTransactionsAPI({
        page: currentPage,
        limit: pageSize,
        category: filterCategory !== "All" ? filterCategory : undefined,
        start: filterDateRange?.start,
        end: filterDateRange?.end,
      })
    );
  }, [dispatch, currentPage, filterCategory, filterDateRange]);

  useEffect(() => {
    dispatch(getMonthlySummaryAPI({ month: selectedMonth, year: selectedYear }));
  }, [dispatch, selectedMonth, selectedYear]);

  const getCategoryColor = (category) => {
    const map = {
      Food: "bg-teal-100 text-teal-800",
      Income: "bg-green-100 text-green-800",
      Shopping: "bg-orange-100 text-orange-800",
      Entertainment: "bg-cyan-100 text-cyan-800",
    };
    return map[category] || "bg-gray-100 text-gray-800";
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      dispatch(deleteTransactionAPI(id)).then(() =>
        dispatch(
          getPaginatedTransactionsAPI({
            page: currentPage,
            limit: pageSize,
            category: filterCategory !== "All" ? filterCategory : undefined,
            start: filterDateRange?.start,
            end: filterDateRange?.end,
          })
        )
      );
    }
  };

  const handleEdit = (transaction) => {
    setEditingTransaction(transaction);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingTransaction(null);
  };

  const handleFilter = () => {
    setCurrentPage(1);
  };

  const handleMonthlySummary = () => {
    dispatch(getMonthlySummaryAPI({ month: selectedMonth, year: selectedYear }));
  };

  return (
    <div className="relative p-6 w-full bg-[#fefcf8] text-gray-800 min-h-screen">
      {/* Monthly Summary Controls */}
      <div className="flex flex-col md:flex-row items-center gap-4 mb-4">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(Number(e.target.value))}
          className="border border-gray-300 rounded px-3 py-2"
        >
          {[...Array(12)].map((_, idx) => (
            <option key={idx + 1} value={idx + 1}>
              {new Date(0, idx).toLocaleString("default", { month: "long" })}
            </option>
          ))}
        </select>

        <input
          type="number"
          value={selectedYear}
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          className="border border-gray-300 rounded px-3 py-2"
          min="2000"
          max="2100"
        />

        <button
          onClick={handleMonthlySummary}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition"
        >
          View Monthly Summary
        </button>
      </div>

      {/* Monthly Summary */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="bg-green-100 text-green-800 px-4 py-3 rounded w-full md:w-1/2">
          <h3 className="font-semibold">
            Income ({selectedMonth}/{selectedYear})
          </h3>
          <p className="text-2xl font-bold">${income.toFixed(2)}</p>
        </div>
        <div className="bg-red-100 text-red-800 px-4 py-3 rounded w-full md:w-1/2">
          <h3 className="font-semibold">
            Expense ({selectedMonth}/{selectedYear})
          </h3>
          <p className="text-2xl font-bold">${expense.toFixed(2)}</p>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <select
          value={filterCategory}
          onChange={(e) => dispatch(setFilterCategory(e.target.value))}
          className="border border-gray-300 rounded px-3 py-2"
        >
          <option value="All">All Categories</option>
          <option value="Food">Food</option>
          <option value="Shopping">Shopping</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Income">Income</option>
        </select>

        <div className="flex gap-2">
          <input
            type="date"
            value={filterDateRange?.start || ""}
            onChange={(e) =>
              dispatch(setFilterDateRange({ ...filterDateRange, start: e.target.value }))
            }
            className="border border-gray-300 rounded px-3 py-2"
          />
          <input
            type="date"
            value={filterDateRange?.end || ""}
            onChange={(e) =>
              dispatch(setFilterDateRange({ ...filterDateRange, end: e.target.value }))
            }
            className="border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <button
          onClick={handleFilter}
          className="px-4 py-2 bg-green-600 text-white font-medium rounded hover:bg-green-700 transition"
        >
          Filter
        </button>
      </div>

      {/* Add Transaction Button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => {
            setEditingTransaction(null);
            setShowModal(true);
          }}
          className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 transition"
        >
          + Add Transaction
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm transition-all duration-200">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md relative">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              ✖
            </button>
            <CreateTransactionForm
              closeModal={closeModal}
              defaultData={editingTransaction}
            />
          </div>
        </div>
      )}

      {/* Transaction List */}
      {transactions.length === 0 ? (
        <p className="p-6">No transactions found.</p>
      ) : (
        transactions.map((tx) => (
          <div
            key={tx._id}
            className="bg-[#fffaf3] p-4 mb-4 rounded-lg border border-gray-200 shadow transition-all duration-300 hover:shadow-lg"
          >
            <p className="text-sm text-gray-500 mb-1">
              {new Date(tx.date).toLocaleDateString()}
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold text-gray-800">{tx.description}</p>
                <span
                  className={`inline-block px-2 py-1 mt-1 text-xs rounded ${getCategoryColor(tx.category)}`}
                >
                  {tx.category}
                </span>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <p className="text-lg font-bold ${tx.type === 'income' ? 'text-green-700' : 'text-red-700'}">
                  ${tx.amount.toFixed(2)}
                </p>
                <div className="flex gap-2 mt-1">
                  <button onClick={() => handleEdit(tx)} className="text-blue-500 hover:text-blue-700">
                    <MdEdit />
                  </button>
                  <button onClick={() => handleDelete(tx._id)} className="text-red-500 hover:text-red-700">
                    <MdDelete />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}

      {/* Pagination Controls */}
      {pages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {[...Array(pages)].map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentPage(idx + 1)}
              className={`px-3 py-1 rounded border ${
                currentPage === idx + 1
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 border-gray-300"
              } hover:bg-blue-500 hover:text-white transition`}
            >
              {idx + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
