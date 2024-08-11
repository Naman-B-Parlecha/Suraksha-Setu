"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { redirect, useRouter } from 'next/navigation';

const disasterData = {
  earthquake: {
    name: "Earthquake",
    steps: [
      "Find cover under sturdy furniture or against an interior wall.",
      "Hold on until the shaking stops.",
      "If you are outdoors, move to an open area away from buildings, trees, and power lines.",
      "After the shaking stops, check yourself and others for injuries.",
      "Be prepared for aftershocks and move to a safer location if necessary.",
      "Listen to emergency broadcasts and follow the instructions of local authorities.",
    ],
  },
  flood: {
    name: "Flood",
    steps: [
      "Move to higher ground immediately.",
      "Avoid walking or driving through floodwaters.",
      "Turn off utilities like gas and electricity if instructed to do so.",
      "If trapped in a building, move to the highest floor and avoid the attic unless you can escape through the roof.",
      "Listen to local alerts and weather updates to stay informed about the situation.",
      "After the flood, avoid floodwater as it may be contaminated or electrically charged from downed power lines.",
    ],
  },
  hurricane: {
    name: "Hurricane",
    steps: [
      "Secure your home by boarding up windows and bringing in outdoor furniture.",
      "Stock up on emergency supplies, including food, water, and medications.",
      "If ordered to evacuate, leave immediately and follow the evacuation routes.",
      "Stay indoors during the storm, away from windows and doors.",
      "After the hurricane passes, avoid flooded areas and downed power lines.",
      "Check in with family and friends to let them know you are safe.",
    ],
  },
  wildfire: {
    name: "Wildfire",
    steps: [
      "Create a defensible space around your home by clearing away flammable vegetation.",
      "Prepare an emergency kit and make an evacuation plan with your family.",
      "If there is a wildfire in your area, monitor the situation closely and be ready to evacuate.",
      "When evacuating, wear protective clothing like long sleeves, pants, and sturdy shoes.",
      "After the fire, avoid hot spots and be cautious of falling trees or debris.",
      "Stay informed about air quality and take precautions if you have respiratory issues.",
    ],
  },
  tsunami: {
    name: "Tsunami",
    steps: [
      "If you are near the coast and feel a strong earthquake, move to higher ground immediately.",
      "Stay away from the beach and coastal areas until the tsunami warning is lifted.",
      "Listen to emergency broadcasts for updates and instructions.",
      "If you are on a boat, head to deeper water to avoid the waves.",
      "After the tsunami, stay away from affected areas as there may be debris and contaminated water.",
      "Help others if you can, but prioritize your safety and that of your family.",
    ],
  },
};

export default function Disaster({ params }) {
  const disaster = disasterData[params.tutorialId];
  const [currentStep, setCurrentStep] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  
  if (!disaster) {
    return <p>Disaster not found.</p>;
  }
  
  const nextStep = () => {
    if (currentStep < disaster.steps.length - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      setShowModal(true);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    router.push('/user/learn/tutorial'); // Adjust the route as needed
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">{disaster.name} Tutorial</h1>
      
      {/* Vertical Step List */}
      <div className="w-full max-w-xl">
        {disaster.steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.3 }}
            className={`p-4 mb-4 rounded-lg shadow-lg flex items-start space-x-4 ${
              currentStep >= index ? "bg-blue-100" : "bg-gray-100"
            }`}
          >
            <div className="flex-shrink-0">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                  currentStep > index ? "bg-green-500" : currentStep === index ? "bg-blue-500" : "bg-gray-400"
                }`}
              >
                {currentStep > index ? "✔️" : index + 1}
              </div>
            </div>
            <div className="flex-grow">
              <p className="text-lg">{step}</p>
            </div>
          </motion.div>
        ))}
      </div>
  
      {/* Navigation Buttons */}
      <div className="mt-8 flex justify-between w-full max-w-xl">
        <button
          onClick={prevStep}
          disabled={currentStep === 0}
          className={`${
            currentStep === 0 ? "bg-gray-300" : "bg-blue-500"
          } text-white px-4 py-2 rounded`}
        >
          Previous
        </button>
        <button
          onClick={nextStep}
          disabled={false} // Ensure the button is not disabled
          className={`${
            currentStep === disaster.steps.length - 1
              ? "bg-green-400"
              : "bg-blue-500"
          } text-white px-4 py-2 rounded`}
        >
          {currentStep === disaster.steps.length - 1 ? "Finish" : "Next"}
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-30 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full text-center">
            <h2 className="text-2xl font-bold mb-4">Congratulations!</h2>
            <p className="mb-4">You've completed all the steps for the {disaster.name} tutorial.</p>
            <button
              onClick={handleCloseModal}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Go Back to Tutorials
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
