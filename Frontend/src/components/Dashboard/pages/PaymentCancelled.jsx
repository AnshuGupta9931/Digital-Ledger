import React from "react";
import { Link } from "react-router-dom";

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-white text-center px-4">
      <div className="w-40 h-40 rounded-full bg-red-100 flex items-center justify-center mb-6 shadow-lg">
        <span className="text-red-600 text-6xl font-bold">✖</span>
      </div>
      <h1 className="text-3xl font-bold text-gray-800 mb-2">Payment Cancelled</h1>
      <p className="text-gray-600 max-w-md mb-6">
        Your payment was not completed. You can try again or contact support for help.
      </p>
      <Link
        to="/dashboard/friends"
        className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-lg transition"
      >
        Try Again
      </Link>
    </div>
  );
};

export default PaymentCancelled;
