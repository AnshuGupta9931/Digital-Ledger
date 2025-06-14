import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FiPlus, FiUsers, FiEdit2, FiTrash2 } from "react-icons/fi";
import {
  fetchUserGroupsAPI,
  createGroupAPI,
  updateGroupAPI,
  deleteGroupAPI,
} from "../../../services/operations/groupAPI";
import { fetchFriendsAPI } from "../../../services/operations/friendAPI";

export const Groups = () => {
  const dispatch = useDispatch();
  const { groups, loading } = useSelector((state) => state.group);
  const { friends } = useSelector((state) => state.friend);

  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", members: [] });
  const [editMode, setEditMode] = useState(false);
  const [editingGroupId, setEditingGroupId] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null); // 🔹 For "View Group"

  useEffect(() => {
    dispatch(fetchUserGroupsAPI());
    dispatch(fetchFriendsAPI());
  }, [dispatch]);

  const handleOpenModal = (group = null) => {
    if (group) {
      setEditMode(true);
      setEditingGroupId(group._id);
      setFormData({
        name: group.name,
        members: group.members.map((m) => m._id),
      });
    } else {
      setEditMode(false);
      setEditingGroupId(null);
      setFormData({ name: "", members: [] });
    }
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setFormData({ name: "", members: [] });
    setEditMode(false);
    setEditingGroupId(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editMode) {
      dispatch(updateGroupAPI({ id: editingGroupId, ...formData }));
    } else {
      dispatch(createGroupAPI(formData));
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this group?")) {
      dispatch(deleteGroupAPI(id));
    }
  };

  const handleMemberChange = (id) => {
    setFormData((prev) => ({
      ...prev,
      members: prev.members.includes(id)
        ? prev.members.filter((mid) => mid !== id)
        : [...prev.members, id],
    }));
  };

  const friendArray = Object.values(friends);

  return (
    <div className="min-h-screen w-full bg-[#fefcf8] p-10 text-gray-800">
      <div className="mb-10">
        <p className="text-[#6B7280] font-medium">
          <b>Organize shared expenses with your groups.</b>
        </p>
      </div>

      <div className="mb-8">
        <button
          onClick={() => handleOpenModal()}
          className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-2.5 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition duration-300"
        >
          <FiPlus className="text-lg" />
          Create Group
        </button>
      </div>

      {loading ? (
        <div className="text-center text-gray-500">Loading groups...</div>
      ) : groups.length === 0 ? (
        <div className="text-center text-gray-500">No groups found</div>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {groups.map((group) => (
            <div
              key={group._id}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 relative"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full shadow-md">
                  <FiUsers className="text-xl" />
                </div>
                <h2 className="text-xl font-semibold text-blue-800">
                  {group.name}
                </h2>
              </div>
              <p className="text-sm text-gray-600 mb-1">
                <b>Members:</b>{" "}
                {group.members?.filter(Boolean).map((m) => `${m.firstName} ${m.lastName}`).join(", ") || "No members"}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                <b>Total Expenses:</b> ₹0
              </p>
              <div className="flex justify-between items-center mt-2">
                <button
                  onClick={() => setSelectedGroup(group)} // 🔹 Set selected group
                  className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition"
                >
                  View Group
                </button>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleOpenModal(group)}
                    className="text-blue-600 hover:text-blue-800"
                    title="Edit"
                  >
                    <FiEdit2 />
                  </button>
                  <button
                    onClick={() => handleDelete(group._id)}
                    className="text-red-500 hover:text-red-700"
                    title="Delete"
                  >
                    <FiTrash2 />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 🔹 Create/Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4">
              {editMode ? "Edit Group" : "Create Group"}
            </h3>
            <form onSubmit={handleSubmit}>
              <label className="block mb-2 text-sm font-medium">Group Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full p-2 border rounded-md mb-4"
                required
              />
              <label className="block mb-2 text-sm font-medium">Select Members</label>
              <div className="mb-4 max-h-40 overflow-y-auto border rounded-md p-2">
                {friendArray.map((user) => (
                  <label key={user._id} className="block text-sm">
                    <input
                      type="checkbox"
                      checked={formData.members.includes(user._id)}
                      onChange={() => handleMemberChange(user._id)}
                      className="mr-2"
                    />
                    {user.name || `${user.firstName} ${user.lastName}`} ({user.email})
                  </label>
                ))}
              </div>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-4 py-2 border rounded-md text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  {editMode ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 🔹 Group Details Modal */}
      {selectedGroup && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg relative">
            <h3 className="text-xl font-semibold mb-4">Group Details</h3>
            <p><b>Name:</b> {selectedGroup.name}</p>
            <p className="mt-2"><b>Members:</b></p>
            <ul className="list-disc list-inside text-gray-700 ml-4">
              {selectedGroup.members?.filter(Boolean).map((m) => (
                <li key={m._id}>
                  {m.firstName} {m.lastName} ({m.email})
                </li>
              ))}
            </ul>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => setSelectedGroup(null)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 text-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
