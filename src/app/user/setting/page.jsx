"use client";

import Header from "@/app/(components)/Header/page";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Settings = () => {
  const [userSettings, setUserSettings] = useState([]);

  useEffect(() => {
    getUserDetails();
  }, []);

  const handleInputChange = (index, value) => {
    const settingsCopy = [...userSettings];
    settingsCopy[index].value = value;
    setUserSettings(settingsCopy);
  };

  const getUserDetails = async () => {
    try {
      const phone = localStorage.getItem("phone");
      const res = await axios.get(`/api/user/${phone}`);
      const data = res.data;

      const settingsArray = Object.keys(data)
      .filter((key) => key !== "id") // Exclude the "id" key
      .map((key) => ({
        label: key.charAt(0).toUpperCase() + key.slice(1),
        value: data[key] !== null ? data[key] : "",
        type: "text",
      }));

      setUserSettings(settingsArray);
    } catch (error) {
      console.log("Error in fetching user details", error);
    }
  };

  const updateUserDetails = async () => {
    try {
      // Construct the object to send back
      const updatedData = userSettings.reduce((acc, setting) => {
        const key = setting.label.charAt(0).toLowerCase() + setting.label.slice(1);
        acc[key] = setting.value;
        return acc;
      }, {});

      // Send the updated data back to the server
      const phone = localStorage.getItem("phone");
      const res = await axios.post(`/api/user/${phone}`, updatedData);
      
      console.log("Update successful", res.data);
    } catch (error) {
      console.log("Error in updating user details", error);
    }
  };

  return (
    <div className="w-full">
      <Header name="User Settings" />
      <div className="overflow-x-auto mt-5 shadow-md">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Setting
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Value
              </th>
              <button  className="text-left py-3 px-4 uppercase font-semibold text-sm" onClick={updateUserDetails}>
                Save
              </button>

            </tr>
          </thead>
          <tbody>
            {userSettings.map((setting, index) => (
              <tr className="hover:bg-blue-50" key={setting.label}>
                <td className="py-2 px-4">{setting.label}</td>
                <td className="py-2 px-4">
                  <input
                    type={setting.type}
                    className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
                    value={setting.value}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-lg"
          onClick={updateUserDetails}
        >
          Update Details
        </button>
      </div>
    </div>
  );
};

export default Settings;
