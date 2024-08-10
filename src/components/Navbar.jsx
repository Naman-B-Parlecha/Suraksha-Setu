"use client";

import { IoMdLogIn } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";

import Image from "next/image";
import React, { useState } from "react";
import { Bell } from "lucide-react";

const Navbar = () => {
  const [isLoggin, setIsLoggin] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogin = () => {};
  return (
    <div className="flex justify-between items-center w-full mb-7">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="relative">
          <div
            className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
              isSidebarCollapsed ? "px-5" : "px-8"
            }`}
          >
            <Image
              src="/logo.png"
              alt="logo"
              width={60}
              height={60}
              className="rounded-full"
            />
            <h1
              className={`${
                isSidebarCollapsed ? "hidden" : "block"
              } font-extrabold text-2xl`}
            >
              Suraksha Setu
            </h1>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div className="relative">
            <input
              type="search"
              placeholder="Search Area"
              className="pl-10 pr-4 py-2 w-50 md:w-60 border-2 border-gray-300 bg-white rounded-lg focus:outline-none focus:border-blue-500"
            />

            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-non">
              <Bell className="text-gray-500" size={20} />
            </div>
          </div>
          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            {isLoggin ? (
              <>
                <Image
                  src="https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/profile.jpg"
                  alt="Profile"
                  width={50}
                  height={50}
                  className="rounded-full h-full object-cover"
                />
                <span className="font-semibold">Darshil</span>
              </>
            ) : (
              <></>
            )}
          </div>
        </div>
        <button onClick={() => handleLogin()}>
          {isLoggin ? (
            <div className="font-bold flex items-center space-x-4 text-lg">
              Logout {"  "} <RiLogoutCircleLine size={30} />
            </div>
          ) : (
            <div className="font-bold flex items-center space-x-4 text-lg">
              Login {"  "} <IoMdLogIn size={30} />
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
