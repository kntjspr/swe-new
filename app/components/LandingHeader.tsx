"use client";

import Link from "next/link";
import Image from "next/image";
import { useUser } from "@stackframe/stack";

export default function LandingHeader() {
    const user = useUser();

    return (
        <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between mix-blend-difference">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 relative">
                    <Image
                        src="/logo.png"
                        alt="FitTracker Logo"
                        fill
                        className="object-contain"
                    />
                </div>
                <span className="font-bold tracking-tighter text-xl uppercase text-white">FitTracker</span>
            </div>
            {/* <nav className="hidden md:flex items-center gap-8 text-sm">
                <Link href="/dashboard" className="text-white hover:text-[#FF4B00] transition-colors uppercase tracking-widest">Dashboard</Link>
                <Link href="/generate" className="text-white hover:text-[#FF4B00] transition-colors uppercase tracking-widest">Generator</Link>
                <Link href="/saved" className="text-white hover:text-[#FF4B00] transition-colors uppercase tracking-widest">Saved</Link>
            </nav> */}
            {user ? (
                <Link
                    href="/dashboard"
                    className="group relative px-6 py-2 bg-white text-black text-sm font-bold uppercase tracking-wider hover:bg-[#FF4B00] hover:text-white transition-colors"
                >
                    <span className="relative z-10">Dashboard</span>
                </Link>
            ) : (
                <Link
                    href="/handler/sign-in"
                    className="group relative px-6 py-2 bg-white text-black text-sm font-bold uppercase tracking-wider hover:bg-[#FF4B00] hover:text-white transition-colors"
                >
                    <span className="relative z-10">Sign In</span>
                </Link>
            )}
        </header>
    );
}
