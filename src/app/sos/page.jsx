"use client";
import React, { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { checkDomain } from "../../../domain/domain";

const Sos = () => {
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState("");
  const queryClient = useQueryClient();

  const domain = checkDomain();

  const handleSubmit = (e) => {
    e.preventDefault();
    const latitude = location.split(" ")[1];
    const longitude = location.split(" ")[3];
    const data = {
      message,
      latitude,
      longitude,
    };
    sendSOS(data);
  };

  const { mutate: sendSOS } = useMutation({
    mutationFn: async (message) => {
      const response = await axios.post(`${domain}api/sos`, message);

      queryClient.refetchQueries({
        queryKey: ["fetchsos"],
        type: "active",
      });

      return response.data;
    },

    onSuccess: () => {
      alert("SOS sent successfully!");
    },

    onError: () => {
      alert("Failed to send SOS!");
    },
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLocation(
          `Latitude: ${position.coords.latitude} Longitude: ${position.coords.longitude}`
        );
      });
    } else {
      setLocation("Geolocation is not supported by this browser.");
    }
  }, []);
  return (
    <div className="w-full flex flex-col ">
      <div
        id="locationBanner"
        className={`p-6 
          ${location ? "bg-green-500" : "bg-red-500"}
          text-white text-center rounded-lg shadow-lg max-w-4xl mx-auto mt-8 mb-2`}
      >
        <p id="locationMessage" className="text-2xl font-bold mb-2">
          {location
            ? "We have found your location!"
            : "Please allow location sharing!"}
        </p>
      </div>
      <div>
        <form
          id="sosForm"
          method="POST"
          className="p-6 max-w-md mx-auto bg-white rounded-lg shadow-md"
          onSubmit={(e) => handleSubmit(e)}
        >
          <div className="mb-4">
            <label
              htmlForfor="sosMessage"
              className="block text-gray-700 font-bold mb-2"
            >
              Select an SOS message:
            </label>
            <select
              id="sosMessage"
              name="sosMessage"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a message</option>
              <option value="Need immediate help!">Need immediate help!</option>
              <option value="Emergency situation, please assist!">
                Emergency situation, please assist!
              </option>
              <option value="In danger, need assistance ASAP!">
                In danger, need assistance ASAP!
              </option>
              <option value="Custom">Custom</option>
            </select>
          </div>

          <div className="mb-4">
            <label
              htmlForor="customMessage"
              className="block text-gray-700 font-bold mb-2"
            >
              Or enter a custom message:
            </label>
            <input
              type="text"
              id="customMessage"
              name="customMessage"
              placeholder="Enter your message here"
              disabled={message !== "Custom"}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Send SOS
          </button>
        </form>
      </div>
    </div>
  );
};

export default Sos;
