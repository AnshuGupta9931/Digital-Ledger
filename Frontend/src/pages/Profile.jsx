import React, { useState, useEffect } from "react";
import { updateProfileDetails } from "../services/profileAPI";
import { useSelector, useDispatch } from "react-redux";
// Import Heroicons you use (make sure these are installed and imported correctly)
import {
  PencilIcon,
  CheckIcon,
  AdjustmentsVerticalIcon,
  CurrencyRupeeIcon,
  BellAlertIcon,
  UsersIcon,
  CalendarDaysIcon,
  PhoneIcon,
  IdentificationIcon,
  UserIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";
import { setUser } from "../slices/profileSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.profile);
  const token = useSelector((state) => state.auth.token);

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    contactNumber: "",
    dateOfBirth: "",
    gender: "",
    about: "",
  });

  useEffect(() => {
    if (user) {
      setFormData({
        contactNumber: user.additionalDetails?.contactNumber || "",
        dateOfBirth: user.additionalDetails?.dateOfBirth || "",
        gender: user.additionalDetails?.gender || "",
        about: user.additionalDetails?.about || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    if (!token) {
      alert("User is not authenticated. Please login.");
      return;
    }

    setLoading(true);
    try {
      const response = await updateProfileDetails(formData, token);
      console.log("Updated Profile Response:", response);
      alert("Profile updated successfully!");
      setIsEditing(false);
      dispatch(setUser(response.data));
    } catch (err) {
      console.error("Update failed:", err);
      alert("Failed to update profile.");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-500 text-xl">Loading profile...</div>
      </div>
    );
  }

  const { contactNumber, dateOfBirth, gender, about } = formData;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white dark:bg-gray-900 shadow-2xl rounded-2xl">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <img
            src={user.image}
            alt="Profile"
            className="w-20 h-20 rounded-full border-4 border-blue-500 shadow-md"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              {user.firstName} {user.lastName}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
          </div>
        </div>
        <button
          disabled={loading}
          onClick={() => (isEditing ? handleSave() : setIsEditing(true))}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isEditing ? (
            <CheckIcon className="w-5 h-5" />
          ) : (
            <PencilIcon className="w-5 h-5" />
          )}
          {isEditing ? (loading ? "Saving..." : "Save") : "Edit"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Static cards */}
        <StaticCard
          icon={<AdjustmentsVerticalIcon className="h-6 w-6 text-purple-600" />}
          label="Account Type"
        >
          {user.accountType}
        </StaticCard>
        <StaticCard
          icon={<CurrencyRupeeIcon className="h-6 w-6 text-yellow-600" />}
          label="Savings"
        >
          ₹{user.savings?.toLocaleString("en-IN")}
        </StaticCard>
        <StaticCard
          icon={<BellAlertIcon className="h-6 w-6 text-red-500" />}
          label="Notifications"
        >
          Email: {user.notification?.email ? "Yes" : "No"}, Push:{" "}
          {user.notification?.push ? "Yes" : "No"}
        </StaticCard>
        <StaticCard
          icon={<UsersIcon className="h-6 w-6 text-teal-600" />}
          label="Friends & Groups"
        >
          {user.friendRequest?.length} Requests, {user.groups?.length} Groups
        </StaticCard>
        <StaticCard
          icon={<CalendarDaysIcon className="h-6 w-6 text-pink-600" />}
          label="Account Created"
        >
          {new Date(user.createdAt).toLocaleDateString()}
        </StaticCard>

        {/* Editable fields */}
        <EditableCard
          icon={<PhoneIcon className="h-6 w-6 text-green-600" />}
          label="Contact Number"
          name="contactNumber"
          value={contactNumber}
          isEditing={isEditing}
          onChange={handleChange}
        />
        <EditableCard
          icon={<IdentificationIcon className="h-6 w-6 text-orange-600" />}
          label="Date of Birth"
          name="dateOfBirth"
          value={dateOfBirth}
          type="date"
          isEditing={isEditing}
          onChange={handleChange}
        />
        <EditableCard
          icon={<UserIcon className="h-6 w-6 text-blue-600" />}
          label="Gender"
          name="gender"
          value={gender}
          isEditing={isEditing}
          onChange={handleChange}
          type="select"
          options={["Male", "Female", "Other"]}
        />
        <EditableCard
          icon={<ChatBubbleLeftRightIcon className="h-6 w-6 text-cyan-600" />}
          label="Bio"
          name="about"
          value={about}
          isEditing={isEditing}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

// Placeholder components for StaticCard and EditableCard, you should keep your existing implementations
const StaticCard = ({ icon, label, children }) => (
  <div className="flex items-center gap-4 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
    <div>{icon}</div>
    <div>
      <h4 className="font-semibold text-gray-700 dark:text-gray-300">{label}</h4>
      <p className="text-gray-900 dark:text-gray-100">{children}</p>
    </div>
  </div>
);

const EditableCard = ({
  icon,
  label,
  name,
  value,
  isEditing,
  onChange,
  type = "text",
  options = [],
}) => {
  return (
    <div className="flex flex-col gap-1 bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center gap-4">
        <div>{icon}</div>
        <label className="font-semibold text-gray-700 dark:text-gray-300">{label}</label>
      </div>
      {isEditing ? (
        type === "select" ? (
          <select
            name={name}
            value={value}
            onChange={onChange}
            className="mt-1 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            className="mt-1 p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          />
        )
      ) : (
        <p className="text-gray-900 dark:text-gray-100">{value || "-"}</p>
      )}
    </div>
  );
};

export default Profile;
