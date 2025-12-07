import type { Metadata } from "next";
import { Suspense } from "react";
import { StackProvider, StackTheme } from "@stackframe/stack";
import { stackClientApp } from "../stack/client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";
import MobileHeader from "./components/MobileHeader";

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
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#FAFAFA] dark:bg-zinc-950 text-[#222222] dark:text-zinc-100 h-screen flex overflow-hidden selection:bg-[#FF4B00] selection:text-white bg-noise`}
      ><StackProvider app={stackClientApp}><StackTheme>
        <Suspense fallback={<aside className="hidden md:flex flex-col w-72 bg-white dark:bg-zinc-900 border-r border-zinc-100 dark:border-zinc-800 h-screen sticky top-0 p-8 shadow-[4px_0_24px_rgba(0,0,0,0.01)] z-10" />}>
          <Sidebar />
        </Suspense>
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Suspense fallback={<header className="md:hidden flex items-center justify-between px-6 py-4 bg-white dark:bg-zinc-900 sticky top-0 z-40 border-b border-zinc-100 dark:border-zinc-800 h-[68px]" />}>
            <MobileHeader />
          </Suspense>
          <main className="flex-1 overflow-y-auto relative">
            <div className="max-w-3xl mx-auto min-h-full pb-32 md:p-10 md:pb-10">
              {children}
            </div>
          </main>
        </div>
        <Suspense fallback={<div className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-t border-zinc-100 dark:border-zinc-800 z-50 pb-safe" />}>
          <MobileNav />
        </Suspense>
      </StackTheme></StackProvider></body>
    </html>
  );
}
