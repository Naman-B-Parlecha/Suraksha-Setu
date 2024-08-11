import Link from "next/link";

const disasters = [
  { id: "earthquake", name: "Earthquake", image: "/earthquake.jpg" },
  { id: "flood", name: "Flood", image: "/flood.jpg" },
  { id: "hurricane", name: "Hurricane", image: "/hurricane.jpg" },
  { id: "wildfire", name: "Wildfire", image: "/wildfire.jpg" },
  { id: "tsunami", name: "Tsunami", image: "/tsunami.jpg" },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-5">
      <h1 className="text-4xl font-bold mb-10 text-black">Select a Natural Disaster</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-4xl">
        {disasters.map((disaster) => (
          <li
            key={disaster.id}
            className="relative w-full"
            style={{ paddingTop: '100%' }} // Square aspect ratio
          >
            <div
              className="absolute inset-0 bg-cover bg-center rounded-lg shadow-lg flex items-center justify-center text-center transition-transform duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl"
              style={{ backgroundImage: `url(${disaster.image})` }}
            >
              <div className="absolute inset-0 bg-black opacity-40 rounded-lg"></div> {/* Overlay for text visibility */}
              <Link href={`/user/learn/tutorial/${disaster.id}`}>
                <p className="relative text-2xl font-semibold text-white z-10">
                  {disaster.name}
                </p>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
