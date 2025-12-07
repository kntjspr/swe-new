"use client";

import { LayoutGrid, Dumbbell, Clock, LogOut, Bookmark } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@stackframe/stack";
import { stackClientApp } from "../../stack/client";
import Image from "next/image";

export default function Sidebar() {
  const pathname = usePathname();
  const user = useUser();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="hidden md:flex flex-col w-72 bg-black border-r border-zinc-800 h-screen overflow-y-auto p-8 z-10">
      <div className="flex items-center gap-3 mb-12">
        <div className="w-8 h-8 relative">
          <Image
            src="/logo.png"
            alt="Logo"
            fill
            className="object-contain"
          />
        </div>
        <span className="font-bold tracking-tighter text-lg text-white uppercase">
          FitTracker_Pro
        </span>
      </div>

      <nav className="space-y-2">
        <Link
          href="/dashboard"
          className={`nav-item w-full flex items-center gap-4 px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all border border-transparent ${isActive("/dashboard")
            ? "bg-zinc-900 text-[#FF4B00] border-zinc-800"
            : "text-zinc-500 hover:text-white hover:bg-zinc-900/50"
            }`}
        >
          <LayoutGrid className="w-4 h-4" /> Dashboard
        </Link>
        <Link
          href="/generate"
          className={`nav-item w-full flex items-center gap-4 px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all border border-transparent ${isActive("/generate")
            ? "bg-zinc-900 text-[#FF4B00] border-zinc-800"
            : "text-zinc-500 hover:text-white hover:bg-zinc-900/50"
            }`}
        >
          <Dumbbell className="w-4 h-4" /> Generator
        </Link>
        <Link
          href="/saved"
          className={`nav-item w-full flex items-center gap-4 px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all border border-transparent ${isActive("/saved")
            ? "bg-zinc-900 text-[#FF4B00] border-zinc-800"
            : "text-zinc-500 hover:text-white hover:bg-zinc-900/50"
            }`}
        >
          <Bookmark className="w-4 h-4" /> Saved
        </Link>
        <Link
          href="/history"
          className={`nav-item w-full flex items-center gap-4 px-4 py-3 text-sm font-bold uppercase tracking-wider transition-all border border-transparent ${isActive("/history")
            ? "bg-zinc-900 text-[#FF4B00] border-zinc-800"
            : "text-zinc-500 hover:text-white hover:bg-zinc-900/50"
            }`}
        >
          <Clock className="w-4 h-4" /> History
        </Link>
      </nav>

      <div className="mt-auto">
        {user ? (
          <div className="flex items-center gap-4 p-4 border border-zinc-800 bg-zinc-900/50">
            <div className="w-8 h-8 bg-zinc-800 shrink-0 border border-zinc-700 relative">
              {/* User Avatar - Square/Technical Look */}
              <img
                src={user.profileImageUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=kennykenntttt"}
                alt="User"
                className="w-full h-full object-cover grayscale opacity-80"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-bold text-white truncate uppercase tracking-tight">
                {user.displayName || "User"}
              </span>
              <button
                onClick={() => stackClientApp.signOut()}
                className="flex items-center gap-1 text-[10px] text-zinc-500 hover:text-[#FF4B00] mt-1 font-medium transition-colors uppercase tracking-widest"
              >
                Sign out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3 p-4 border border-zinc-800 bg-zinc-900">
            <div className="text-xs font-bold text-zinc-500 text-center mb-1 uppercase tracking-widest">
              Access Required
            </div>
            <Link
              href="/handler/sign-in"
              className="w-full flex items-center justify-center px-4 py-2 bg-[#FF4B00] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#D43D00] transition-colors"
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </aside>
  );
}
