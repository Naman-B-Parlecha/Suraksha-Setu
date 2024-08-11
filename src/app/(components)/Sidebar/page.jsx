"use client";

import {
  BookOpenText,
  Layout,
  LogOut,
  LucideIcon,
  SlidersHorizontal,
  SquareLibrary,
  View,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

const SidebarLink = ({ href, icon: Icon, label, isCollapsed }) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");
  useEffect(() => {
    if (!localStorage.getItem("phone")) {
      window.location.href = "/";
    }
  });
  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        }
        hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-200 text-white" : ""
        }
      }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />

        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-700`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = React.useState(false);

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;
  
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };
  
  return (
    <div className={sidebarClassNames}>
      {/* TOP LOGO */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          isSidebarCollapsed ? "px-5" : "px-8"
        }`}
      >
        <Link href="/user/dashboard">
          <Image
            src="/logo-color.png"
            alt="logo"
            width={200}
            height={200}
            className="rounded-full w-52 h-28 object-cover"
          />
        </Link>
       
      </div>

      {/* LINKS */}
      <div className="flex-grow mt-8">
        <SidebarLink
          href="/user/dashboard"
          icon={Layout}
          label="Dashboard"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/user/learn"
          icon={BookOpenText}
          label="Learn"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/user/news"
          icon={SquareLibrary}
          label="News"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/user/blog"
          icon={View}
          label="Blog"
          isCollapsed={isSidebarCollapsed}
        />
        <SidebarLink
          href="/user/setting"
          icon={SlidersHorizontal}
          label="Settings"
          isCollapsed={isSidebarCollapsed}
        />
        <button className="w-full" onClick={handleLogout}>
        <SidebarLink
          href="/"
          icon={LogOut}
          label="Logout"
          isCollapsed={isSidebarCollapsed}
        />
        </button>
      </div>

      {/* FOOTER */}
      <div className={`${isSidebarCollapsed ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">
          &copy; 2024 Suraksha Setu
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
