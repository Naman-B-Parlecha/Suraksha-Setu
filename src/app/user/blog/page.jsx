"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineCreate } from "react-icons/md";
import CreatePostModal from "@/components/Modal";

const blogPosts = [
  {
    id: 1,
    title: "UI/UX Review Check",
    description:
      "Because it's about motivating the doers. Because I'm here to follow my dreams and inspire others.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=1471&amp;q=80",
    date: "January 10",
    location: "New York, NY",
    tags: ["UI/UX", "Design", "Review"],
  },
  {
    id: 2,
    title: "The Impact of Natural Disasters on Communities",
    description:
      "A personal account of witnessing the devastating effects of natural disasters and the resilience of affected communities.",
    image:
      "https://i.pinimg.com/736x/c7/35/e5/c735e54ce94a36a8229a45b97e54187d.jpg",
    date: "March 15",
    location: "Puerto Rico",
    tags: ["Disasters", "Community", "Resilience"],
  },
  {
    id: 3,
    title: "Lessons Learned from Hurricane Maria",
    description:
      "Reflecting on the experiences and lessons learned during Hurricane Maria, including the challenges faced and the support received.",
    image:
      "https://i.pinimg.com/736x/c7/35/e5/c735e54ce94a36a8229a45b97e54187d.jpg",
    date: "April 22",
    location: "Dominican Republic",
    tags: ["Hurricane Maria", "Lessons", "Recovery"],
  },
  {
    id: 4,
    title: "Volunteering During a Crisis",
    description:
      "An account of my experience volunteering during a crisis, the impact it had on me, and the importance of community support in times of need.",
    image:
      "https://i.pinimg.com/736x/c7/35/e5/c735e54ce94a36a8229a45b97e54187d.jpg",
    date: "June 10",
    location: "Houston, TX",
    tags: ["Volunteering", "Crisis", "Community Support"],
  },
];
const BlogPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("/api/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const handleSavePost = async (newPost) => {
    const response = await fetch("/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    });

    if (response.ok) {
      const savedPost = await response.json();
      setPosts((prevPosts) => [...prevPosts, savedPost]);
    }
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogPosts.map((post) => (
          <Link
            href={`/user/blog/${post.id}`}
            key={post.id}
            className="relative flex flex-col overflow-hidden rounded-xl bg-white text-gray-700 shadow-md"
          >
            <div className="relative overflow-hidden bg-transparent rounded-t-xl">
              <Image
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
                layout="responsive"
                width={600}
                height={300}
              />
            </div>
            <div className="flex flex-col flex-grow p-6">
              <h4 className="text-2xl font-semibold text-blue-gray-900">
                {post.title}
              </h4>
              <p className="mt-3 text-xl text-gray-700">{post.description}</p>
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
                <p className="text-base text-gray-600">{post.date}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSavePost}
      />
    </div>
  );
};

export default BlogPage;
