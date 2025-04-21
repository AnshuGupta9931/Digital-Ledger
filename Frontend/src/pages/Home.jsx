import React from "react";

export const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-5xl text-gray-800">

        {/* Welcome Header */}
        <div className="text-blue-600 font-bold text-sm mb-1">WELCOME TO</div>
        <div className="text-4xl font-bold text-gray-900 mb-6">Digital Ledger</div>

        {/* Project Overview */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm mb-8">
          <div className="text-xl font-semibold mb-2 text-gray-900">About the Project</div>
          <p className="text-gray-700 leading-relaxed">
            <strong>Digital Ledger</strong> is a personal finance management tool designed to help you take control of your money.
            From tracking transactions and recurring bills to managing shared expenses with friends or groups — it's your all-in-one solution
            for smarter money habits. The app combines simplicity, usability, and powerful features to make financial organization easier than ever.
          </p>
        </div>

        {/* Section Overview */}
        <div className="space-y-6">
          <Section
            title="Dashboard"
            description="View your total balance, income, expenses, and savings in one glance."
          />
          <Section
            title="Transactions"
            description="Log and manage your income and spending with categories and filters."
          />
          <Section
            title="Recurring Bills"
            description="Track regular expenses like rent, bills, and subscriptions easily."
          />
          <Section
            title="Friends"
            description="Add friends, chat with them, and split expenses in real time."
          />
          <Section
            title="Groups"
            description="Organize group spending, manage dues, and simplify settlements."
          />
          <Section
            title="Settings"
            description="Manage your profile, account preferences, and app configurations."
          />
        </div>

      </div>
    </div>
  );
};

// Section Component
const Section = ({ title, description }) => (
  <div className="bg-gray-100 rounded-xl p-4 border border-gray-200 hover:shadow-md transition">
    <div className="text-lg font-semibold text-gray-900 mb-1">{title}</div>
    <p className="text-gray-700 text-sm">{description}</p>
  </div>
);
