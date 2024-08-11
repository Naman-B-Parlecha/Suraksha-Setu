import BenefitCard from "@/components/BenefitCard";
import FeatureCard from "@/components/FeatureCard";
import { TbSos } from "react-icons/tb";
import { IoMdAlert } from "react-icons/io";
import { RiGraduationCapFill } from "react-icons/ri";
import { HiUserGroup } from "react-icons/hi";
import { MdSecurity } from "react-icons/md";
import { MdDevices } from "react-icons/md";
import Image from "next/image";
import "./globals.css";
import Link from "next/link";
export default function Home() {
  return (
    <main className="w-full min-h-screen">
      <div className="w-full p-4 flex flex-col items-center mb-8">
        <h1 className="text-center w-full leading-tight text-3xl line md:text-5xl font-bold md:w-2/3 mb-2">
          <span className="text-red-500">Enhancing Disaster Management</span>{" "}
          with Innovative Solutions.
        </h1>
        <p className="text-center text-lg md:w-2/3 md:text-lg mb-4">
          Our platform provides comprehensive disaster management tools, from
          real-time SOS dispatch to educational resources, empowering
          individuals and communities to prepare for and respond to disasters
          effectively.
        </p>

        <div className="w-full h-40 md:w-2/3 rounded-xl md:h-96 bg-orange-200 object-contain">
          <Image
            src="/main.png"
            alt="home"
            width={1200} // Specify the actual width of the image
            height={800} // Specify the actual height of the image
            className="w-full h-full object-cover"
          />
        </div>
        <Link href={"/user/learn/quiz"} className="w-fit px-4 py-2 bg-red-500 text-white font-semibold mt-8 rounded-md text-xl">
            Login
        </Link>
      </div>

      <div className="w-full h-fit flex flex-col items-center p-4 px-40 gap-4 mb-8">
        <h1 className="text-center w-full leading-tight text-3xl line md:text-5xl font-bold md:w-2/3 mb-2">
          Features that <span className="text-red-500">empower</span> your{" "}
          <span className="text-red-500">disaster management efforts.</span>{" "}
          Powered by technology, tailored for you.
        </h1>
        <FeatureCard
          feature="SOS FEATURE"
          title="Instant SOS Dispatch"
          description="Our platform includes an inbuilt SOS feature that allows users to send an emergency request to government authorities with a single click, ensuring rapid response during critical situations."
          reverse={true}
          image={"/sos.jpeg"}
        />

        <FeatureCard
          feature="BLOG PAGE"
          title="Share and Learn from Experiences"
          description="Our blog page enables users to share their personal experiences with disasters, fostering a community of learning and support through real-life stories and insights."
          reverse={false}
          image={"/expi.jpg"}
        />
        <FeatureCard
          feature="E-LEARNING PLATFORM"
          title="Disaster Education and Quizzes"
          description="Access our e-learning platform to study disaster preparedness and precautionary measures. Test your knowledge with interactive quizzes and stay informed about best practices."
          reverse={true}
          image={"/quiz.jpg"}
        />
        <FeatureCard
          feature="ROLE BASED AUTH"
          title="Secure and Personalized Access"
          description="Our platform features role-based authentication to ensure that users have appropriate access to resources and tools based on their roles and responsibilities."
          reverse={false}
          image={"/auth.jpeg"}
        />
        <FeatureCard
          feature="COMPLAINT SYSTEM"
          title="Report Disaster-Related Losses"
          description="File complaints about losses incurred due to disasters through our complaint system, facilitating documentation and resolution of issues caused by such events."
          reverse={true}
          image={"/complaint.jpg"}
        />
        <FeatureCard
          feature="CHATBOT"
          title="Disaster Management Assistance"
          description="Engage with our chatbot to learn about disaster management best practices, receive recommendations, and get information on how to stay safe during emergencies."
          reverse={false}
          image={"/chatbot.jpg"}
        />
      </div>

      <div className="w-full flex flex-col items-center p-4 px-40">
        <h1 className="text-center w-full leading-tight text-3xl line md:text-5xl font-bold md:w-2/3 mb-2">
          <span className="text-red-500">Innovative</span> Technology to{" "}
          <span className="text-red-500">Enhance Disaster Management.</span>
        </h1>
        <p className="text-center text-lg md:w-2/3 md:text-lg mb-4">
          Our platform leverages advanced technology to improve disaster
          management and support community resilience.
        </p>
        <div className="w-full h-full p-4 flex gap-2 flex-col md:grid md:grid-row-2 md:grid-cols-3 gap-y-4">
          <BenefitCard
            title="Efficient SOS Dispatch"
            description="Quickly send SOS requests to authorities in emergency situations, ensuring a prompt response."
            icon={<TbSos />}
          />
          <BenefitCard
            title="Real-Time Alerts"
            description="Receive immediate alerts and notifications about potential disasters. Our beep sound feature activates during critical events to ensure timely action."
            icon={<IoMdAlert />}
          />
          <BenefitCard
            title="Disaster Education"
            description="Access a variety of educational materials and quizzes to enhance your knowledge of disaster preparedness and response."
            icon={<RiGraduationCapFill />}
          />
          <BenefitCard
            title="Community Engagement"
            description="Share and read personal experiences about disasters, fostering a supportive community of knowledge and resilience."
            icon={<HiUserGroup />}
          />
          <BenefitCard
            title="Centralized Resource Access"
            description="Utilize a single platform to access and manage disaster-related resources, ensuring all necessary information is readily available."
            icon={<MdSecurity />}
          />
          <BenefitCard
            title="Mobile and Web Accessibility"
            description="Access disaster management tools and resources both through our website and mini app, ensuring support is available wherever you are."
            icon={<MdDevices />}
          />
        </div>
      </div>
    </main>
  );
}
