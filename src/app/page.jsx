"use client";

import NewsModal from "@/components/NewsModal";
import axios from "axios";
import { useEffect, useState } from "react";
import TableauViz from "@/analytics/Tableau";
import useFcmToken from "@/hook/useFcmToken";

const Page = () => {
  const { token, notificationPermissionStatus } = useFcmToken();
  const [data,setData] = useState([]);

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


  const getNews = async () => {
    const res = await axios.get("https://newsapi.org/v2/everything?q=disaster&apiKey=b7a0ce9a02ba46a389e03d60e25fbe6a");
    console.log('data',res.data.articles);
    setData(res.data.articles);
  }

  useEffect(() => {
    getNews();
  },[]);

  return (
    <div className="flex h-full">
      <div className="w-1/2">
      <TableauViz />
      </div>
      <div className="w-1/2">
        <h1 className="text-2xl font-bold">Recent News</h1>
        <div className="flex flex-col gap-2 max-h-full overflow-auto custom-overflow w-max pr-4">
        {data.map((article,i) => <NewsModal key={i} article={article} />)}
        </div>
      </div>
    </div>
  );
};

export default Page;
