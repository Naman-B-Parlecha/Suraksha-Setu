// pages/blog/[id].js

import Image from "next/image";

const BlogPost = () => {
  // Simulating data fetching for a specific blog post
  const post = {
    id: 2,
    title: "The Impact of Natural Disasters on Communities",
    description:
      "A personal account of witnessing the devastating effects of natural disasters and the resilience of affected communities.",
    image:
      "https://i.pinimg.com/736x/c7/35/e5/c735e54ce94a36a8229a45b97e54187d.jpg",
    date: "March 15",
    location: "Puerto Rico",
    tags: ["Disasters", "Community", "Resilience"],
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
        <p className="text-gray-600 text-xl">
          {post.date} | {post.location}
        </p>
      </header>

      <div className="mb-4">
        <Image
          src={post.image}
          alt={post.title}
          width={736}
          height={414}
          layout="responsive"
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

      <p className="text-lg leading-relaxed">{post.description}</p>
    </div>
  );
};

export default BlogPost;
