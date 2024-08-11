import { Inter, Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar.jsx"
import TanStackQuery, { TanStackQueryDevTools } from "../tanstack/TanstackQuery.jsx"
import { Toaster } from "react-hot-toast";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata = {
  title: "Suraksha Setu",
  description: "A safety app for everyone",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>

      <link rel="icon" href="/favi.ico" sizes="any" />
      </head>
      <TanStackQuery>
        <body className={quicksand.className}>
          <div className="p-2 md:pr-10">
            <Navbar />
          </div>
          <Toaster position="bottom-right" />
          {children}
        </body>
        <TanStackQueryDevTools />
      </TanStackQuery>
    </html>
  );
}
