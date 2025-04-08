import React from "react";
import { FiPlus, FiUsers } from "react-icons/fi";

const groupData = [
  {
    id: 1,
    name: "Travel Buddies",
    members: ["Alice", "Bob", "Charlie"],
    expenses: "$230",
  },
  {
    id: 2,
    name: "Roommates",
    members: ["John", "Emily"],
    expenses: "$480",
  },
];

export const Groups = () => {
  return (
    <div className="min-h-screen w-full bg-[#fefcf8] p-10 text-gray-800">
      {/* Page Title */}
      <div className="mb-10">
        <p className="text-[#6B7280] font-medium">
          <b>Organize shared expenses with your groups.</b>
        </p>
      </div>

      {/* Add Group Button */}
      <div className="mb-8">
        <button className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 px-6 py-2.5 rounded-full text-white font-semibold shadow-lg hover:shadow-xl transition duration-300">
          <FiPlus className="text-lg" />
          Create Group
        </button>
      </div>

      {/* Groups List */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {groupData.map((group) => (
          <div
            key={group.id}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300"
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
              <b>Members:</b> {group.members.join(", ")}
            </p>
            <p className="text-sm text-gray-600 mb-4">
              <b>Total Expenses:</b> {group.expenses}
            </p>
            <button className="mt-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-full text-sm font-medium shadow-md hover:shadow-lg transition">
              View Group
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
