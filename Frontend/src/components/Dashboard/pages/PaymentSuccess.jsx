import React from "react";
import { Link } from "react-router-dom";

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-center px-4">
      <div className="w-40 h-40 rounded-full bg-blue-100 flex items-center justify-center mb-6 shadow-lg">
        <span className="text-blue-800 text-6xl font-bold">✔</span>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Successful</h1>
      <p className="text-gray-600 max-w-md mb-6">
        Your payment has been processed successfully. Thank you for the Debt clearance!
      </p>
      <Link
        to="/dashboard"
        className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-lg transition"
      >
        Go to Dashboard
      </Link>
    </div>
  );
};

export default PaymentSuccess;
