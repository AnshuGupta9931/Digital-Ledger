import React from "react";

export const Settings = () => {
  const settings = [
    {
      title: "Account",
      description: "Login and security",
    },
    {
      title: "Personal",
      description: "Profile information",
    },
    {
      title: "Notifications",
      description: "Email and alerts",
    },
    {
      title: "About",
      description: "Terms, privacy, licenses",
    },
  ];

  return (
    <div className="min-h-screen bg-[#fefcf8] p-10 text-gray-800">

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {settings.map((setting, index) => (
          <div
            key={index}
            className="bg-[#FDF8ED] hover:bg-[#f7f0e2] cursor-pointer p-6 rounded-xl shadow-md transition-colors"
          >
            <h2 className="text-lg font-bold text-blue-900 mb-1">{setting.title}</h2>
            <p className="text-sm text-gray-700">{setting.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
