import { Quicksand } from "next/font/google";
import "../globals.css";
import DashboardWrapper from "../DashboardWrapper";

const inter = Quicksand({ subsets: ["latin"] });

export const metadata = {
  title: "User Dashboard",
  description: "User dashboard page",
};

export default function RootLayout({
  children,
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <DashboardWrapper>{children}</DashboardWrapper>
      </body>
    </html>
  );
}
