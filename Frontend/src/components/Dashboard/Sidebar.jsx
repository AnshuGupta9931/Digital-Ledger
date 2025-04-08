import React from "react";
import { NavLink } from "react-router-dom";
import { FiHome, FiList,FiTag, FiX,FiRepeat,FiBarChart2,FiUsers,FiSettings,FiTrendingUp } from "react-icons/fi";
import { FaHandshake } from "react-icons/fa";
import { HiUserGroup } from "react-icons/hi";

const links = [
  { name: "dashboard", path: "/dashboard", icon: <FiHome /> },
  {
    name: 'transaction',path : '/dashboard/transaction',icon:<FiList/>
  },
  {
    name: 'categories', path: "/dashboard/categories", icon: <FiTag/>
  },
  {
    name: 'recuringbills', path : "/dashboard/recuringbills", icon: <FiRepeat/>
  },
  {
    name: 'reports', path : "/dashboard/reports", icon: <FiBarChart2/>
  },
  {
    name: 'friends', path : "/dashboard/friends", icon: <FiUsers />
  },
  {
    name: 'debt-settlements', path : "/dashboard/debt-settlements", icon: <FaHandshake />
  },
  {
    name: 'savings', path : "/dashboard/savings", icon: <FiTrendingUp />
  },
  {
    name: 'groups', path : "/dashboard/groups", icon: <HiUserGroup />
  },
  {
    name: 'settings', path : "/dashboard/settings", icon: <FiSettings />
  },
  
];

export default function Sidebar({ closeSidebar }) {
  return (
    <aside className="h-full w-64 bg-blue-900 p-4 shadow-md md:relative md:translate-x-0 fixed z-50 inset-y-0 left-0 transform transition-transform duration-300 ease-in-out">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-bold text-white">Digital Ledger</h2>
        <FiX className="md:hidden cursor-pointer text-xl text-white" onClick={closeSidebar} />
      </div>
      <nav className="flex flex-col gap-2">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            end={link.path === "/dashboard"}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded px-3 py-2 text-sm font-bold transition-colors duration-200 ${
                isActive ? "bg-yellow-400 text-blue-900" : "text-white hover:bg-blue-800"
              }`
            }
            onClick={closeSidebar}
          >
            <span className="text-lg">{link.icon}</span>
            <span className="capitalize">{link.name}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
