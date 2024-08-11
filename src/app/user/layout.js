import { Quicksand } from "next/font/google";
import "../globals.css";
import TanStackQuery, { TanStackQueryDevTools } from "../../tanstack/TanstackQuery.jsx";
import DashboardWrapper from "../dashboardWrapper";

const inter = Quicksand({ subsets: ["latin"] });

export const metadata = {
  title: "User Dashboard",
  description: "User dashboard page",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <TanStackQuery>
        <body className={inter.className}>
          <DashboardWrapper>{children}</DashboardWrapper>
        </body>
        <TanStackQueryDevTools />
      </TanStackQuery>
    </html>
  );
}
