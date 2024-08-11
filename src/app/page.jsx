"use client";

import NewsModal from "@/components/NewsModal";
import axios from "axios";
import { useEffect, useState } from "react";
import TableauViz from "@/analytics/Tableau";

const Page = () => {
  const [data,setData] = useState([]);

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
