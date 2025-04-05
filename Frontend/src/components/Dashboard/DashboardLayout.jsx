import React, { useState } from "react";
import DashboardHeader from "./DashboardHeader";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen">
      {isSidebarOpen && <Sidebar />}
      <div className="flex flex-col flex-1">
        <DashboardHeader toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <main className="p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
