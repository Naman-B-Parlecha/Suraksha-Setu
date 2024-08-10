import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const colors = ["#00C49F", "#0088FE", "#FFBB28"];

const dummyData = {
  labels: ["USA", "India", "Germany"],
  datasets: [
    {
      label: "User Locations",
      data: [300, 500, 200],
      backgroundColor: colors,
      hoverBackgroundColor: colors,
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: "bottom",
    },
  },
};

const UserLocation = () => {
  const isLoading = false;

  return (
    <div className="row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              User Location
            </h2>
            <hr />
          </div>
          {/* BODY */}
          <div className="xl:flex justify-between pr-7">
            {/* CHART */}
            <div
              className="relative"
              style={{ height: "200px", width: "200px" }}
            >
              <Pie data={dummyData} options={options} />
            </div>
            {/* LABELS */}
            <ul className="flex flex-col justify-around items-center xl:items-start py-5 gap-3">
              {dummyData.labels.map((label, index) => (
                <li key={index} className="flex items-center gap-2">
                  <span
                    className="block w-3 h-3 rounded-full"
                    style={{ backgroundColor: colors[index] }}
                  ></span>
                  <span>
                    {label}: {dummyData.datasets[0].data[index]}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          {/* FOOTER */}
          <div>
            <hr />
          </div>
        </>
      )}
    </div>
  );
};

export default UserLocation;
