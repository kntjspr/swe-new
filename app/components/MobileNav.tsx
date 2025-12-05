"use client";

import { LayoutGrid, Dumbbell, Clock, LogIn, LogOut } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useUser } from "@stackframe/stack";
import { stackClientApp } from "../../stack/client";

export default function MobileNav() {
    const pathname = usePathname();
    const user = useUser();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border-t border-zinc-100 dark:border-zinc-800 z-50 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.02)]">
            <div className="flex justify-around items-center h-20">
                <Link
                    href="/"
                    className={`nav-btn group flex flex-col items-center justify-center w-full h-full ${isActive("/") ? "text-[#FF4B00]" : "text-zinc-400 hover:text-[#FF4B00]"
                        }`}
                >
                    <LayoutGrid className="w-6 h-6 mb-1.5 transition-colors" />
                    <span className="text-[10px] tracking-wide font-medium">Home</span>
                </Link>
                <Link
                    href="/generate"
                    className={`nav-btn group flex flex-col items-center justify-center w-full h-full ${isActive("/generate") ? "text-[#FF4B00]" : "text-zinc-400 hover:text-[#FF4B00]"
                        }`}
                >
                    <div className="bg-[#FF4B00] text-white p-3 rounded-full mb-1 shadow-lg shadow-[#FF4B00]/20 transform -translate-y-4 group-hover:-translate-y-5 transition-transform duration-300">
                        <Dumbbell className="w-6 h-6" />
                    </div>
                </Link>
                <Link
                    href="/history"
                    className={`nav-btn group flex flex-col items-center justify-center w-full h-full ${isActive("/history")
                        ? "text-[#FF4B00]"
                        : "text-zinc-400 hover:text-[#FF4B00]"
                        }`}
                >
                    <Clock className="w-6 h-6 mb-1.5 transition-colors" />
                    <span className="text-[10px] tracking-wide font-medium">History</span>
                </Link>
                {user ? (
                    <button
                        onClick={() => stackClientApp.signOut()}
                        className="nav-btn group flex flex-col items-center justify-center w-full h-full text-zinc-400 hover:text-[#FF4B00]"
                    >
                        <LogOut className="w-6 h-6 mb-1.5 transition-colors" />
                        <span className="text-[10px] tracking-wide font-medium">Sign Out</span>
                    </button>
                ) : (
                    <Link
                        href="/handler/sign-in"
                        className={`nav-btn group flex flex-col items-center justify-center w-full h-full ${isActive("/handler/sign-in") ? "text-[#FF4B00]" : "text-zinc-400 hover:text-[#FF4B00]"
                            }`}
                    >
                        <LogIn className="w-6 h-6 mb-1.5 transition-colors" />
                        <span className="text-[10px] tracking-wide font-medium">Sign In</span>
                    </Link>
                )}
            </div>
        </nav>
    );
}
