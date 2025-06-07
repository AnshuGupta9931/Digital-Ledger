import React, { useState, useRef, useEffect } from "react";
import { FiMenu } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setToken } from "../../slices/authSlice.jsx";
import { setUser } from "../../slices/profileSlice.jsx";

const DashboardHeader = ({ toggleSidebar }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const dropdownRef = useRef();

  const { user } = useSelector((state) => state.profile);
  const username =
    user?.firstName ||
    user?.fullName ||
    user?.email?.split("@")[0] ||
    "User";

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const getPageTitle = () => {
    const segments = location.pathname.split("/").filter(Boolean);
    const last = segments[segments.length - 1] || "dashboard";
    return last.charAt(0).toUpperCase() + last.slice(1);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(setToken(null));
    dispatch(setUser(null));
    navigate("/login");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-blue-600 shadow-md relative">
      <div className="flex items-center space-x-4">
        <button onClick={toggleSidebar}>
          <FiMenu size={24} className="text-white" />
        </button>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          {getPageTitle()}
        </h1>
      </div>

      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center space-x-2 cursor-pointer focus:outline-none"
        >
          <div className="h-8 w-8 rounded-full bg-yellow-400 text-white flex items-center justify-center font-bold uppercase">
            {username[0]}
          </div>
          <span className="text-white font-medium">{username}</span>
        </button>

        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
            <button
              onClick={() => navigate("/profile")}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              My Profile
            </button>
            <button
              onClick={handleLogout}
              className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default DashboardHeader;
