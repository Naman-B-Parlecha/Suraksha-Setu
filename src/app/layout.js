import { Inter, Quicksand } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import TanStackQuery, { TanStackQueryDevTools } from "@/tanstack/TanstackQuery";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata = {
  title: "Suraksha Setu",
  description: "A safety app for everyone",
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <TanStackQuery>
        <body className={quicksand.className}>
          <div className="p-2 md:pr-10">
            <Navbar />
          </div>

          {children}
        </body>
        <TanStackQueryDevTools />
      </TanStackQuery>
    </html>
  );
}
