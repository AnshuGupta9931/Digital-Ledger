import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const DashboardHeader = ({ toggleSidebar }) => {
  const location = useLocation();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const getPageTitle = () => {
    const segments = location.pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1] || "dashboard";
    return last.charAt(0).toUpperCase() + last.slice(1);
  };

  const handleProfileMenuToggle = () => {
    setIsProfileMenuOpen((prev) => !prev);
  };

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 shadow-lg">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="transition-transform transform hover:scale-110 focus:outline-none"
        >
          <FiMenu size={24} className="text-white" />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">{getPageTitle()}</h1>
      </div>
      <div className="relative flex items-center space-x-3">
        <div
          className="h-10 w-10 rounded-full bg-yellow-500 text-white flex items-center justify-center font-semibold transition-transform transform hover:scale-110 cursor-pointer"
          onClick={handleProfileMenuToggle}
        >
          J
        </div>
        <span className="text-white font-medium">John Doe</span>
        {isProfileMenuOpen && (
          <div className="absolute top-12 right-0 mt-2 bg-white shadow-md rounded-md w-48 py-2 z-50">
            <ul>
              <li className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">Profile</li>
              <li className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">Settings</li>
              <li className="px-4 py-2 text-gray-800 hover:bg-gray-100 cursor-pointer">Logout</li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
