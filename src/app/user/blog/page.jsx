"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineCreate } from "react-icons/md";
import CreatePostModal from "../../../components/Modal"

const BlogPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/blog")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setPosts(data);
      });
  }, []);

  const handleSavePost = async (newPost) => {
    const response = await fetch("/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });
    console.log(response);
    if (response.ok) {
      const savedPost = await response.json();
      setPosts((prevPosts) => [...prevPosts, savedPost]);
    }
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <div className="w-full flex justify-end mb-6">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-black text-white font-bold rounded-md text-xl hover:bg-black/80 transition-all duration-300 ease-in-out flex flex-nowrap gap-2 justify-center items-center"
        >
          <MdOutlineCreate />
          <p>Write Experience</p>
        </button>
      </div>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Link
              href={`/user/blog/${post.id}`}
              key={post.id}
              className="relative flex flex-col overflow-hidden rounded-xl bg-white text-gray-700 shadow-md"
            >
              <div className="relative overflow-hidden bg-transparent rounded-t-xl">
                <Image
                  src={post.image}
                  alt={post.title}
                  className="w-full max-h-48 object-cover"
                  layout="responsive"
                  width={600}
                  height={300}
                />
              </div>
              <div className="flex flex-col flex-grow p-6">
                <h4 className="text-2xl font-semibold text-blue-gray-900">
                  {post.title}
                </h4>
                <p className="mt-3 text-xl text-gray-700">
                  {post.content.slice(0, 50)}...
                </p>
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-600">
                    {post.location}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-end mt-auto p-6">
                  <p className="text-base text-gray-600">
                    {formatDate(post.updatedAt)}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div>
          <p className="text-xl font-semibold">No blogs found</p>
        </div>
      )}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePost}
      />
    </div>
  );
};

export default BlogPage;
