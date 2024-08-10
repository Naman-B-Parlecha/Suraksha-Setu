import React from "react";

const BenefitCard = ({ title, description, icon }) => {
  return (
    <div className="flex flex-col border-2 border-black/10 rounded-lg p-4 md:border-none md:col-span-1 md:row-span-1">
      <div className="border-2 border-black/10 p-2 w-fit h-fit rounded-lg mb-4 text-red-600">
        {icon}
      </div>
      <h1 className="text-xl font-semibold">{title}</h1>
      <p>{description}</p>
    </div>
  );
};

export default BenefitCard;
