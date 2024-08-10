import React from "react";

const PurchaseSummary = () => {
  const isLoading = false;

  // Dummy data for purchases
  const purchases = [
    { date: "2024-08-01", amount: 50 },
    { date: "2024-08-03", amount: 75 },
    { date: "2024-08-07", amount: 120 },
  ];

  const totalPurchased = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);

  return (
    <div className="flex flex-col justify-between row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-2xl">
      {isLoading ? (
        <div className="m-5">Loading...</div>
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Purchase Summary
            </h2>
            <hr />
          </div>

          {/* BODY */}
          <div>
            {/* BODY HEADER */}
            <div className="mb-4 mt-7 px-7">
              <p className="text-xs text-gray-400">Total Purchased</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold">${totalPurchased}</p>
              </div>
            </div>

            {/* RECENT PURCHASES */}
            <div className="px-7 pb-5">
              <p className="text-xs text-gray-400 mb-3">Recent Purchases</p>
              <ul className="space-y-2">
                {purchases.map((purchase, index) => (
                  <li key={index} className="flex justify-between text-sm">
                    <span>{purchase.date}</span>
                    <span className="font-semibold">${purchase.amount}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PurchaseSummary;
