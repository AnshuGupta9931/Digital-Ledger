import React from "react";

const bills = [
  { name: "Internet", amount: "$60.00", dueDate: "5th", frequency: "Monthly" },
  { name: "Rent", amount: "$1,200.00", dueDate: "1st", frequency: "Monthly" },
  { name: "Streaming Service", amount: "$15.00", dueDate: "12th", frequency: "Monthly" },
  { name: "Gym Membership", amount: "$40.00", dueDate: "20th", frequency: "Monthly" },
];

export const RecurringBills = () => {
  return (
    <div className="w-full min-h-screen bg-[#fefcf8] p-10 text-gray-800">
      <div className="flex justify-between items-center mb-6">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-[#162028] transition">
          + Add Bill
        </button>
      </div>

      {/* Glow-up container */}
      <div className="bg-white rounded-2xl shadow-[0_6px_24px_rgba(37,99,235,0.15)] hover:shadow-[0_10px_40px_rgba(37,99,235,0.25)] transition-all duration-300 p-4 overflow-x-auto">
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
            {bills.map((bill, index) => (
              <tr key={index} className="border-b last:border-none text-md">
                <td className="px-4 py-3">{bill.name}</td>
                <td className="px-4 py-3">{bill.amount}</td>
                <td className="px-4 py-3">{bill.dueDate}</td>
                <td className="px-4 py-3">{bill.frequency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
