"use client"
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

const BlogPost = ({ params }) => {
  // Simulating data fetching for a specific blog post
  const [post, setPost] = useState({
    title: "",
    description: "",
    image: "",
    date: "",
    location: "",
    tags: [],
  });

  useEffect(() => {
    async function handleFetch() {
      const response = await axios.get(`/api/blog/${params.blogId}`);
      console.log(response.data);
      setPost(response.data);
    }
    handleFetch();
  }, [params.blogId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 text-xl">
          {formatDate(post.updatedAt)} | {post.location}
        </p>
      </header>

      <div className="mb-4">
        <Image
          src={post.image}
          alt={post.title}
          width={736}
          height={414}
          className="rounded-lg shadow-lg"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-6">
        {post.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-200 text-gray-700 px-3 py-1 rounded-full text-sm"
          >
            {tag}
          </span>
        ))}
      </div>

      <p className="text-lg leading-relaxed">{post.content}</p>
    </div>
  );
};

export default BlogPost;