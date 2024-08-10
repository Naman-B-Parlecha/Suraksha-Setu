import Image from "next/image";
import React from "react";
import { BsStars } from "react-icons/bs";
const FeatureCard = ({ feature, title, description, reverse, image }) => {
  return (
    <div
      className={`flex flex-col border-2 border-black/20 p-4 rounded-xl md:border-none ${
        reverse ? "md:flex-row-reverse" : "md:flex-row"
      } w-full px-4 gap-4`}
    >
      <div className="flex-1 bg-orange-100 w-full md:h-60 lg:h-80 rounded-lg overflow-hidden">
        <Image src={image} alt={title} className="w-full h-full" height={320} width={500}/>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex flex-nowrap items-center gap-1">
          <BsStars className="text-red-500 h-6" />
          <p className="text-md text-red-500 font-semibold">{feature}</p>
        </div>
        <h2 className="text-xl font-bold md:text-2xl lg:text-3xl">{title}</h2>
        <p className="text-sm md:text-md lg:text-lg">{description}</p>
      </div>
    </div>
  );
};

export default FeatureCard;
