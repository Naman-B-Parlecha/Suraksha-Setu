"use client";

import { Bell ,Settings } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const [username, setUsername] = React.useState(localStorage.getItem("username"));
  const [phone, setPhone] = React.useState(localStorage.getItem("phone"));

  React.useEffect(() => {
    const handleStorageChange = () => {
      const username = localStorage.getItem("username");
      const phone = localStorage.getItem("phone");
      console.log(username, phone);
      setUsername(username);
      setPhone(phone);
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <div className="flex justify-between items-center w-full mb-7">
      {/* LEFT SIDE */}
      <div className="flex justify-between items-center gap-5">
        
      </div>

      {/* RIGHT SIDE */}
      <div className="flex justify-between items-center gap-5">
        <div className="hidden md:flex justify-between items-center gap-5">
          <div></div>
          <div className="relative">
            <Bell className="cursor-pointer text-gray-500" size={24} />
            <span className="absolute -top-2 -right-2 inline-flex items-center justify-center px-[0.4rem] py-1 text-xs font-semibold leading-none text-red-100 bg-red-400 rounded-full">
              3
            </span>
          </div>
          <hr className="w-0 h-7 border border-solid border-l border-gray-300 mx-3" />
          <div className="flex items-center gap-3 cursor-pointer">
            <Image
              src="https://static-00.iconduck.com/assets.00/profile-default-icon-2048x2045-u3j7s5nj.png"
              alt="Profile"
              width={30}
              height={30}
              className="rounded-full h-full object-cover"
            />
            <span className="font-semibold">{username??phone}</span>
          </div>
        </div>
        <Link href="/user/setting">
          <Settings className="cursor-pointer text-gray-500" size={24} />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
