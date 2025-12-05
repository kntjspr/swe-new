import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FitTracker Pro",
  description: "Transform Your Fitness Journey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FAFAFA] dark:bg-zinc-950 text-[#222222] dark:text-zinc-100 h-screen flex overflow-hidden selection:bg-[#FF4B00] selection:text-white bg-noise`}
      >
        <Sidebar />
        <main className="flex-1 overflow-y-auto relative">
          <div className="max-w-3xl mx-auto min-h-full pb-32 md:p-10 md:pb-10">
            {children}
          </div>
        </main>
        <MobileNav />
      </body>
    </html>
  );
}
