"use client";

import { IoMdLogIn } from "react-icons/io";
import { RiLogoutCircleLine } from "react-icons/ri";

import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const isSidebarCollapsed = false;
  const isLoggin = false;
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
        <Link href="/login">
          {isLoggin ? (
            <>
              <RiLogoutCircleLine size={30} />
            </>
          ) : (
            <div className="font-bold flex items-center space-x-4 text-lg">
            Login {"  "} <IoMdLogIn size={30} />
            </div>
          )}
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
