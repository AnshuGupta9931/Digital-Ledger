import React from "react";
import { useNavigate } from "react-router-dom";

// Image imports
import DashboardImg from "../assets/images/DashBoard.png";
import TransactionsImg from "../assets/images/Transactions.png";
import RecurringImg from "../assets/images/RecurringBills.png";
import FriendsImg from "../assets/images/Friends.png";
import GroupsImg from "../assets/images/TeamBudgeting.png";
import DebtImg from "../assets/images/DebtSettlements.jpeg"; // NEW
import ReportsImg from "../assets/images/Reports.jpeg"     // NEW
import CategoriesImg from "../assets/images/Categories.jpeg"; // NEW

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-6xl text-gray-800">

        {/* Welcome Header */}
        <div className="text-blue-600 font-bold text-sm mb-1">WELCOME TO</div>
        <div className="text-4xl font-bold text-gray-900 mb-6">Digital Ledger</div>

        {/* Project Overview */}
        <div className="bg-gray-50 rounded-xl p-6 shadow-sm mb-10">
          <div className="text-xl font-semibold mb-2 text-gray-900">About the Project</div>
          <p className="text-gray-700 leading-relaxed">
            <strong>Digital Ledger</strong> is a personal finance management tool designed to help you take control of your money.
            From tracking transactions and recurring bills to managing shared expenses with friends or groups — it's your all-in-one solution
            for smarter money habits. The app combines simplicity, usability, and powerful features to make financial organization easier than ever.
          </p>
        </div>

        {/* Section Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          <Section
            title="Dashboard"
            description="View your total balance, income, expenses, and savings in one glance."
            image={DashboardImg}
            onClick={() => navigate("/dashboard")}
          />
          <Section
            title="Transactions"
            description="Log and manage your income and spending with categories and filters."
            image={TransactionsImg}
            onClick={() => navigate("/transactions")}
          />
          <Section
            title="Recurring Bills"
            description="Track regular expenses like rent, bills, and subscriptions easily."
            image={RecurringImg}
            onClick={() => navigate("/recurring")}
          />
          <Section
            title="Friends"
            description="Add friends, chat with them, and split expenses in real time."
            image={FriendsImg}
            onClick={() => navigate("/friends")}
          />
          <Section
            title="Groups"
            description="Organize group spending, manage dues, and simplify settlements."
            image={GroupsImg}
            onClick={() => navigate("/groups")}
          />
          <Section
            title="Debt Settlements"
            description="Settle IOUs and outstanding balances with your friends or group members."
            image={DebtImg}
            onClick={() => navigate("/debts")}
          />
          <Section
            title="Reports"
            description="Generate insightful reports to analyze your spending and savings trends."
            image={ReportsImg}
            onClick={() => navigate("/reports")}
          />
          <Section
            title="Categories"
            description="Create and manage categories for more organized transaction tracking."
            image={CategoriesImg}
            onClick={() => navigate("/categories")}
          />
        </div>
      </div>
    </div>
  );
};

// Section Component
const Section = ({ title, description, image, onClick }) => (
  <div
    onClick={onClick}
    className="bg-gray-100 p-6 rounded-2xl shadow-md hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300 cursor-pointer flex flex-col items-center text-center gap-4"
  >
    <img
      src={image}
      alt={title}
      className="w-48 h-48 object-contain"
    />
    <div>
      <h3 className="text-xl font-semibold text-gray-800 mb-1">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  </div>
);
