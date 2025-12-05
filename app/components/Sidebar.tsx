"use client";

import { LayoutGrid, Dumbbell, Clock, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@stackframe/stack";
import { stackClientApp } from "../../stack/client";

export default function Sidebar() {
  const pathname = usePathname();
  const user = useUser();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="hidden md:flex flex-col w-72 bg-white dark:bg-zinc-900 border-r border-zinc-100 dark:border-zinc-800 h-screen sticky top-0 p-8 shadow-[4px_0_24px_rgba(0,0,0,0.01)] z-10">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-10 h-10 bg-[#FF4B00] rounded-xl flex items-center justify-center text-white font-bold tracking-tighter text-lg shadow-lg shadow-[#FF4B00]/20">
          F
        </div>
        <span className="font-display font-bold tracking-tight text-lg text-zinc-900 dark:text-white">
          FitTracker
        </span>
      </div>

      <nav className="space-y-2">
        <Link
          href="/"
          className={`nav-item w-full flex items-center gap-4 px-4 py-3.5 text-sm font-semibold rounded-2xl transition-all ${isActive("/")
            ? "bg-[#FF4B00]/10 text-[#FF4B00]"
            : "text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-[#FF4B00]"
            }`}
        >
          <LayoutGrid className="w-5 h-5" /> Dashboard
        </Link>
        <Link
          href="/generate"
          className={`nav-item w-full flex items-center gap-4 px-4 py-3.5 text-sm font-semibold rounded-2xl transition-all ${isActive("/generate")
            ? "bg-[#FF4B00]/10 text-[#FF4B00]"
            : "text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-[#FF4B00]"
            }`}
        >
          <Dumbbell className="w-5 h-5" /> Generator
        </Link>
        <Link
          href="/history"
          className={`nav-item w-full flex items-center gap-4 px-4 py-3.5 text-sm font-semibold rounded-2xl transition-all ${isActive("/history")
            ? "bg-[#FF4B00]/10 text-[#FF4B00]"
            : "text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 hover:text-[#FF4B00]"
            }`}
        >
          <Clock className="w-5 h-5" /> History
        </Link>
      </nav>

      <div className="mt-auto">
        {user ? (
          <div className="flex items-center gap-4 p-4 border border-zinc-100 dark:border-zinc-800 rounded-2xl bg-[#FAFAFA] dark:bg-zinc-800">
            <div className="w-10 h-10 rounded-full bg-zinc-200 overflow-hidden ring-2 ring-white dark:ring-zinc-700 shrink-0">
              <img
                src={user.profileImageUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=kennykenntttt"}
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-bold font-display text-zinc-900 dark:text-white truncate">
                {user.displayName || "User"}
              </span>
              <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-wide truncate">
                {user.primaryEmail || "Member"}
              </span>
              <button
                onClick={() => stackClientApp.signOut()}
                className="flex items-center gap-1 text-[10px] text-red-500 hover:text-red-600 mt-1 font-medium transition-colors"
              >
                <LogOut className="w-3 h-3" /> Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 p-4 border border-zinc-100 dark:border-zinc-800 rounded-2xl bg-[#FAFAFA] dark:bg-zinc-800">
            <div className="text-sm font-medium text-zinc-600 dark:text-zinc-400 text-center mb-1">
              Join FitTracker
            </div>
            <Link
              href="/handler/sign-in"
              className="w-full flex items-center justify-center px-4 py-2 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-bold rounded-xl hover:opacity-90 transition-opacity"
            >
              Sign In
            </Link>
            <Link
              href="/handler/sign-up"
              className="w-full flex items-center justify-center px-4 py-2 bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-white text-sm font-bold rounded-xl hover:bg-zinc-200 dark:hover:bg-zinc-600 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
