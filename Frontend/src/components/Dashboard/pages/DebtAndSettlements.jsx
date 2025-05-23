import React from "react";

const mockDebts = [
  {
    id: 1,
    name: "John",
    reason: "Dinner",
    amount: 150.0,
  },
  {
    id: 2,
    name: "Emily",
    reason: "Gift",
    amount: 80.0,
  },
];

export const DebtAndSettlements = () => {
  const handleSettleUp = async (debt) => {
    try {
      const response = await fetch("http://localhost:8000/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          amount: debt.amount,
          name: debt.name,
          reason: debt.reason,
        }),
      });
  
      const data = await response.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error("Payment failed", error);
      alert("Error starting payment.");
    }
  };
  


  return (
    <div className="bg-[#fefcf8] p-10 text-gray-800 min-h-screen">
      <div className="w-full bg-gray-200 rounded-xl shadow-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-blue-900 text-white px-6 py-4 flex justify-between items-center rounded-t-xl">
          <button className="text-2xl font-bold">+</button>
        </div>

        {/* Content */}
        <div className="px-6 py-4 flex-1 overflow-y-auto">
          <h3 className="text-xs font-bold text-blue-900 tracking-wider mb-4">DEBTS</h3>

          {mockDebts.map((debt) => (
            <div key={debt.id} className="mb-6 border-b pb-4 last:border-b-0 last:pb-0">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-lg font-bold text-blue-900">{debt.name}</h4>
                  <p className="text-sm text-blue-900">{debt.reason}</p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold text-red-600">${debt.amount.toFixed(2)}</p>
                </div>
              </div>
              <button
  onClick={() => handleSettleUp(debt)}
  className="mt-3 bg-gray-300 px-4 py-2 rounded-md text-blue-900 font-semibold text-sm"
>
  Settle Up
</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

