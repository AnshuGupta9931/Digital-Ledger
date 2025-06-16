import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      {isSidebarOpen && <Sidebar />}

      <div className="flex flex-col flex-1">
        {/* Header stays fixed height at top */}
        <div className="shrink-0">
          <DashboardHeader toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        </div>

        {/* This part scrolls */}
        <div className="flex-1 overflow-y-auto bg-gray-50 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
