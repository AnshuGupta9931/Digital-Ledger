import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDebtsAPI,
  settleDebtAPI,
  deleteDebtAPI,
  createDebtAPI,
} from "../../../services/operations/debtAPI";
import { fetchFriendsAPI } from "../../../services/operations/friendAPI";

export const DebtAndSettlements = () => {
  const dispatch = useDispatch();
  const debts = useSelector((state) => state.debt.debts);
  const loading = useSelector((state) => state.debt.loading);
  const friends = useSelector((state) => state.friend.friends);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ friendId: "", amount: "" });

  useEffect(() => {
    dispatch(fetchDebtsAPI());
    dispatch(fetchFriendsAPI());
  }, [dispatch]);

  const handleSettleUp = async (debt) => {
    try {
      const response = await fetch("https://digital-ledger-backend.onrender.com/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          amount: debt.amount,
          name: debt.friend?.firstName || "Friend",
          reason: debt.reason || "Debt Settlement",
        }),
      });

      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("Checkout session failed");
      }
    } catch (error) {
      console.error("Payment failed", error);
      alert("Error starting payment.");
    }
  };

  const handleSettleDebt = (id) => {
    dispatch(settleDebtAPI(id));
  };

  const handleDeleteDebt = (id) => {
    if (window.confirm("Are you sure you want to delete this debt?")) {
      dispatch(deleteDebtAPI(id));
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCreateDebt = (e) => {
    e.preventDefault();
    const { friendId, amount } = formData;

    if (!friendId || !amount || parseFloat(amount) <= 0) {
      alert("Please select a friend and enter a valid amount.");
      return;
    }

    dispatch(createDebtAPI(formData));
    setShowForm(false);
    setFormData({ friendId: "", amount: "" });
  };

  const debtArray = Object.values(debts);

  return (
    <div className="bg-[#fefcf8] p-10 text-gray-800 min-h-screen">
      <div className="w-full bg-gray-200 rounded-xl shadow-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center rounded-t-xl">
          <h2 className="text-xl font-semibold">Debts</h2>
          <button
            className="text-xl font-bold bg-white text-blue-900 px-3 py-1 rounded"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "−" : "+"}
          </button>
        </div>

        {/* Debt Form */}
        {showForm && (
          <form onSubmit={handleCreateDebt} className="p-6 bg-white border-b">
            <div className="flex gap-4 mb-4">
              <select
                name="friendId"
                value={formData.friendId}
                onChange={handleInputChange}
                className="flex-1 px-3 py-2 border rounded"
              >
                <option value="">Select Friend</option>
                {Object.values(friends).length > 0 ? (
                  Object.values(friends).map((friend) => (
                    <option key={friend._id} value={friend._id}>
                      {friend.firstName} {friend.lastName}
                    </option>
                  ))
                ) : (
                  <option disabled>No friends available</option>
                )}
              </select>

              <input
                type="number"
                name="amount"
                min="0.01"
                step="0.01"
                placeholder="Amount"
                value={formData.amount}
                onChange={handleInputChange}
                className="flex-1 px-3 py-2 border rounded"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add Debt
            </button>
          </form>
        )}

        {/* Debt List */}
        <div className="px-6 py-4 flex-1 overflow-y-auto">
          <h3 className="text-xs font-bold text-blue-900 tracking-wider mb-4">
            ACTIVE DEBTS
          </h3>

          {loading ? (
            <p className="text-gray-500">Loading debts...</p>
          ) : debtArray.length === 0 ? (
            <p className="text-gray-500">No debts found.</p>
          ) : (
            debtArray.map((debt) => (
              <div
                key={debt._id}
                className="mb-6 border-b pb-4 last:border-b-0 last:pb-0"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="text-lg font-bold text-blue-900">
                      {debt.friend?.firstName || "Friend"}
                    </h4>
                    <p className="text-sm text-blue-900">
                      {debt.reason || "No reason"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-red-600">
                      ${debt.amount.toFixed(2)}
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => handleSettleUp(debt)}
                    className="bg-gray-300 px-4 py-2 rounded-md text-blue-900 font-semibold text-sm"
                  >
                    Settle Up (Pay)
                  </button>
                  <button
                    onClick={() => handleSettleDebt(debt._id)}
                    className="bg-green-500 px-4 py-2 rounded-md text-white font-semibold text-sm"
                  >
                    Mark Settled
                  </button>
                  <button
                    onClick={() => handleDeleteDebt(debt._id)}
                    className="bg-red-600 px-4 py-2 rounded-md text-white font-semibold text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
