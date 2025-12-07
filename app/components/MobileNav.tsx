"use client";

import { LayoutGrid, Dumbbell, Clock } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function MobileNav() {
    const pathname = usePathname();

    const isActive = (path: string) => pathname === path;

    return (
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-xl border-t border-zinc-800 z-50 pb-safe">
            <div className="flex justify-around items-center h-20">
                <Link
                    href="/dashboard"
                    className={`nav-btn group flex flex-col items-center justify-center w-full h-full ${isActive("/dashboard") ? "text-[#FF4B00]" : "text-zinc-500 hover:text-white"
                        }`}
                >
                    <LayoutGrid className="w-5 h-5 mb-1.5 transition-colors" />
                    <span className="text-[10px] tracking-widest font-bold uppercase">Home</span>
                </Link>
                <Link
                    href="/saved"
                    className={`nav-btn group flex flex-col items-center justify-center w-full h-full ${isActive("/saved")
                        ? "text-[#FF4B00]"
                        : "text-zinc-500 hover:text-white"
                        }`}
                >
                    <Dumbbell className="w-5 h-5 mb-1.5 transition-colors" />
                    <span className="text-[10px] tracking-widest font-bold uppercase">Saved</span>
                </Link>
                <Link
                    href="/generate"
                    className={`nav-btn group flex flex-col items-center justify-center w-full h-full ${isActive("/generate") ? "text-[#FF4B00]" : "text-zinc-500 hover:text-white"
                        }`}
                >
                    <div className={`p-1 ${isActive("/generate") ? "bg-[#FF4B00]/10 rounded-full" : ""}`}>
                        <Dumbbell className="w-5 h-5 mb-1.5" />
                    </div>
                    <span className="text-[10px] tracking-widest font-bold uppercase">Gen</span>
                </Link>
                <Link
                    href="/history"
                    className={`nav-btn group flex flex-col items-center justify-center w-full h-full ${isActive("/history")
                        ? "text-[#FF4B00]"
                        : "text-zinc-500 hover:text-white"
                        }`}
                >
                    <Clock className="w-5 h-5 mb-1.5 transition-colors" />
                    <span className="text-[10px] tracking-widest font-bold uppercase">History</span>
                </Link>
            </div>
        </nav>
    );
}
