"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import TableauViz from "@/analytics/Tableau";
import useFcmToken from "@/hook/useFcmToken";
import NewsModal from "../components/NewsModal"

const Page = () => {
  const { token, notificationPermissionStatus } = useFcmToken();
  

  const handleTestNotification = async () => {
    const response = await fetch("/send-notification", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token: token,
        title: "Test Notification",
        message: "This is a test notification",
        link: "/user",
      }),
    });

    const data = await response.json();
    console.log(data);
  };


  

  return (
    <div className="flex h-full">
      <div className="w-1/2">
      </div>
      <div className="w-1/2">
        
      </div>
    </div>
  );
};

export default Page;
