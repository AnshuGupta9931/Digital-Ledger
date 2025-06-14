import React, { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSavings,
  createSavingGoal,
  addToSavingGoal,
  subFromSavingGoal,
  deleteSavingGoal,
  updateSavingGoal,
} from "../../../services/operations/savingAPI";

export const Savings = () => {
  const dispatch = useDispatch();
  const { savings, loading } = useSelector((state) => state.saving);
  const token = useSelector((state) => state.auth.token); 
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] = useState("");

  const [activeModal, setActiveModal] = useState(null);
  const [modalAmount, setModalAmount] = useState("");
  const [selectedGoalId, setSelectedGoalId] = useState(null);

  const [editModal, setEditModal] = useState(false);
  const [editTitle, setEditTitle] = useState("");
  const [editTargetAmount, setEditTargetAmount] = useState("");
  const [editGoalId, setEditGoalId] = useState(null);

  useEffect(() => {
    if (token) dispatch(fetchSavings(token)); 
  }, [dispatch, token]);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!token) return;

    dispatch(createSavingGoal({ title, goalAmount: targetAmount }, token)).then(() => {
      setTitle("");
      setTargetAmount("");
      setShowModal(false);
      dispatch(fetchSavings(token)); // ✅ Sync
    });
  };

  const openModal = (type, id) => {
    setActiveModal(type);
    setSelectedGoalId(id);
    setModalAmount("");
  };

  const handleModalSubmit = () => {
    const amount = Number(modalAmount);
    if (!amount || amount <= 0 || !token) return;

    const selectedGoal = savings.find((goal) => goal._id === selectedGoalId);
    if (!selectedGoal) return;

    if (activeModal === "add") {
      dispatch(addToSavingGoal(selectedGoalId, amount, token)).then(() => {
        dispatch(fetchSavings(token));
      });
    } else if (activeModal === "sub") {
      if (amount > selectedGoal.savedAmount) {
        alert("You cannot subtract more than the saved amount.");
        return;
      }
      dispatch(subFromSavingGoal(selectedGoalId, amount, token)).then(() => {
        dispatch(fetchSavings(token));
      });
    }

    setActiveModal(null);
    setModalAmount("");
    setSelectedGoalId(null);
  };

  const handleDelete = (id) => {
    if (!token) return;
    dispatch(deleteSavingGoal(id, token)).then(() => {
      dispatch(fetchSavings(token));
    });
  };

  const openEditModal = (goal) => {
    setEditGoalId(goal._id);
    setEditTitle(goal.title);
    setEditTargetAmount(goal.goalAmount);
    setEditModal(true);
  };

  const handleUpdate = (e) => {
  e.preventDefault();
  if (!token) return;

  const currentGoal = savings.find((goal) => goal._id === editGoalId);
  if (!currentGoal) return;

  dispatch(
    updateSavingGoal({
      id: editGoalId,
      title: editTitle,
      goalAmount: editTargetAmount,
      savedAmount: currentGoal.savedAmount, 
      token
    })
  ).then(() => {
    setEditModal(false);
    dispatch(fetchSavings(token));
  });
};

  return (
    <div className="min-h-screen w-full bg-[#fefcf8] p-10 text-gray-800">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-[#234E70] mb-2">My Savings Goals</h1>
        <p className="text-[#6B7280] font-medium">
          Track your goals and stay on top of your financial progress.
        </p>
      </div>

      <div className="mb-8">
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-[#4facfe] to-[#00f2fe] hover:from-[#3aa0fe] hover:to-[#00e2fe] px-6 py-2.5 rounded-full text-white font-semibold shadow-lg transition duration-200"
        >
          <FiPlus className="text-lg" />
          Add Saving Goal
        </button>
      </div>

      {/* Render Goals */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savings.map((goal) => (
          <div key={goal._id} className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold text-[#234E70]">{goal.title}</h3>
            <p className="text-sm text-gray-500 mb-2">
              Saved: ₹{goal.savedAmount} / ₹{goal.goalAmount}
            </p>
            <div className="bg-gray-200 rounded-full h-2 w-full mb-4">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{
                  width: `${Math.min(
                    (goal.savedAmount / goal.goalAmount) * 100,
                    100
                  )}%`,
                }}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => openModal("add", goal._id)}
                className="px-3 py-1 bg-green-500 text-white rounded text-sm"
              >
                Add
              </button>
              <button
                onClick={() => openModal("sub", goal._id)}
                className="px-3 py-1 bg-yellow-500 text-white rounded text-sm"
              >
                Subtract
              </button>
              <button
                onClick={() => openEditModal(goal)}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(goal._id)}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold text-[#234E70] mb-4">Create New Saving Goal</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <input
                type="text"
                placeholder="Goal Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              <input
                type="number"
                placeholder="Target Amount"
                value={targetAmount}
                onChange={(e) => setTargetAmount(e.target.value)}
                required
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold text-[#234E70] mb-4">Edit Saving Goal</h2>
            <form onSubmit={handleUpdate} className="space-y-4">
              <input
                type="text"
                placeholder="Goal Title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              <input
                type="number"
                placeholder="Target Amount"
                value={editTargetAmount}
                onChange={(e) => setEditTargetAmount(e.target.value)}
                required
                className="w-full border border-gray-300 p-2 rounded-md"
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditModal(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add/Subtract Modal */}
      {activeModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-sm">
            <h2 className="text-lg font-bold text-[#234E70] mb-4">
              {activeModal === "add" ? "Add Amount" : "Subtract Amount"}
            </h2>
            <input
              type="number"
              placeholder="Enter amount"
              value={modalAmount}
              onChange={(e) => setModalAmount(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleModalSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
                disabled={!modalAmount || Number(modalAmount) <= 0}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
