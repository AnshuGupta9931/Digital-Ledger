import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state) => state.profile);
  if (!user){
    console.log("User is not present");
    return <div className="text-center text-gray-500">Loading...</div>;
  }
  console.log("Present user is : ",user);
  return (
    <div className="max-w-3xl mx-auto p-4 bg-white shadow-md rounded-lg mt-6">
      <h1 className="text-2xl font-semibold mb-4">Profile</h1>
      <div className="space-y-2">
        <div><strong>Name:</strong> {user.firstName} {user.lastName}</div>
        <div><strong>Email:</strong> {user.email}</div>
        <div><strong>Account Type:</strong> {user.accountType}</div>
        <div><strong>Theme:</strong> {user.theme}</div>
        <div><strong>Currency:</strong> {user.currency}</div>
        <div><strong>Savings:</strong> ₹{user.savings}</div>
        <div>
          <strong>Notifications:</strong> 
          Email: {user.notification?.email ? "Yes" : "No"}, 
          Push: {user.notification?.push ? "Yes" : "No"}
        </div>
      </div>
    </div>
  );
};

export default Profile;