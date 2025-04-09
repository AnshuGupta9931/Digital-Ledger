import React from "react";
import { FiMenu } from "react-icons/fi";
import { useLocation } from "react-router-dom";

const DashboardHeader = ({ toggleSidebar }) => {
    const location = useLocation();
  
    const getPageTitle = () => {
      const segments = location.pathname.split("/").filter(Boolean);
      const last = segments[segments.length - 1] || "dashboard";
      return last.charAt(0).toUpperCase() + last.slice(1);
    };
  
    return (
      <header className="flex items-center justify-between px-6 py-4 bg-blue-600 shadow-md">
        <div className="flex items-center space-x-4">
          <button onClick={toggleSidebar}>
            <FiMenu size={24} />
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">{getPageTitle()}</h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-yellow-400 text-white flex items-center justify-center font-bold">
            J
          </div>
          <span className="text-white font-medium">John Doe</span>
        </div>
      </header>
    );
  };
  export default DashboardHeader;
  