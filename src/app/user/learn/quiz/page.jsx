"use client";

import Image from "next/image";
import Link from "next/link";

export default function QuizSelectionPage() {
  const quizzes = [
    {
      title: "Tsunami Preparedness",
      description:
        "Learn how to stay safe before, during, and after a tsunami.",
      image: "/tsunami.jpg",
      quizId: "tsunami",
    },
    {
      title: "Flood Safety",
      description: "Understand the key precautions to take during a flood.",
      image: "/flood.jpg",
      quizId: "flood",
    },
    {
      title: "Earthquake Readiness",
      description: "Test your knowledge on earthquake preparedness.",
      image: "/earthquake.jpg",
      quizId: "earthquake",
    },
    {
      title: "Hurricane Awareness",
      description: "Prepare yourself for hurricane season with this quiz.",
      image: "/hurricane.jpg",
      quizId: "hurricane",
    },
    {
      title: "Wildfire Safety",
      description:
        "Learn how to protect yourself and your home from wildfires.",
      image: "/wildfire.jpg",
      quizId: "wildfire",
    },
  ];

  return (
    <div className="flex w-full flex-row gap-4 flex-wrap">
      {quizzes.map((q, index) => {
        return (
          <div
            key={index}
            className="relative flex bg-clip-border rounded-xl bg-white text-gray-700 shadow-md w-full max-w-[43rem] flex-row"
          >
            <div className="relative w-2/5 m-0 overflow-hidden text-gray-700 bg-white rounded-r-none bg-clip-border rounded-xl shrink-0">
              <Image
                src={q.image}
                alt={q.title}
                layout="fill"
                className="object-cover w-full h-full"
              />
            </div>
            <div className="p-6">
              <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-gray-700 uppercase">
                {q.title}
              </h6>
              <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {q.title}
              </h4>
              <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                {q.description}
              </p>
              <Link
                href={`/user/learn/quiz/${q.quizId}`}
                className="inline-block"
              >
                <button
                  className="flex items-center gap-2 px-6 py-3 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-lg select-none disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none hover:bg-gray-900/10 active:bg-gray-900/20"
                  type="button"
                >
                  Test Knowledge
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                    ></path>
                  </svg>
                </button>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}
