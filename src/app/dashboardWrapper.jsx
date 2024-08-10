"use client";

import React from "react";

import Sidebar from "./(components)/Sidebar/page";
import Navbar from "./(components)/Navbar/page";

const DashboardLayout = ({ children }) => {
  const isDarkMode = false;
  const isSidebarCollapsed = false;
  
  return (
    <div
      className={`${
        isDarkMode ? "dark" : "light"
      } flex bg-gray-50 text-gray-900 w-full min-h-screen`}
    >
      <Sidebar />
      <main
        className={`flex flex-col w-full h-full py-7 px-9 bg-gray-50 ${
          isSidebarCollapsed ? "md:pl-24" : "md:pl-72"
        }`}
      >
        <Navbar />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardWrapper;
