import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ModalController from "@/components/modalController/ModalController";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "wedding planner",
  description: "Wedding planner",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ModalController />
      <body className={poppins.className}>
        <div className="p-5">{children}</div>
      </body>
    </html>
  );
}
