import Image from "next/image";
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="flex justify-center items-center gap-8">
      <Link
        href="/user/learn/tutorial"
        className="relative grid w-[28rem] h-[28rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700"
      >
        <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('https://i.pinimg.com/564x/63/28/92/63289289c1034e6eac2fae0e38b964fb.jpg')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/80 via-black/50"></div>
        </div>
        <div className="relative p-6 px-6 py-14 md:px-12">
          <h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
            Learn with Practical Videos
          </h2>
          <h5 className="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400">
            Watch high-quality practical videos to gain hands-on knowledge and real-world insights. Perfect for visual learners!
          </h5>
        </div>
      </Link>

      <Link
        href="/user/learn/quiz"
        className="relative grid w-[28rem] h-[28rem] flex-col items-end justify-center overflow-hidden rounded-xl bg-white bg-clip-border text-center text-gray-700"
      >
        <div className="absolute inset-0 m-0 h-full w-full overflow-hidden rounded-none bg-transparent bg-[url('https://i.pinimg.com/564x/28/6a/d5/286ad5343e5efe231602802558fc5f3b.jpg')] bg-cover bg-clip-border bg-center text-gray-700 shadow-none">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/80 via-black/50"></div>
        </div>
        <div className="relative p-6 px-6 py-14 md:px-12">
          <h2 className="mb-6 block font-sans text-4xl font-medium leading-[1.5] tracking-normal text-white antialiased">
            Challenge Your Knowledge with Quizzes
          </h2>
          <h5 className="block mb-4 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-gray-400">
            Test your understanding with interactive quizzes. Assess your grasp of key concepts and reinforce your learning!
          </h5>
        </div>
      </Link>
    </div>
  );
};

export default Page;
