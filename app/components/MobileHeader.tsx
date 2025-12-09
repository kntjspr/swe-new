"use client";

import { useUser } from "@stackframe/stack";
import { stackClientApp } from "../../stack/client";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

export default function MobileHeader() {
    const user = useUser();

    return (
        <header className="md:hidden flex items-center justify-between px-6 py-4 bg-black sticky top-0 z-40 border-b border-zinc-800">
            <div className="flex items-center gap-3">
                <div className="w-6 h-6 relative">
                    {/* Placeholder for small logo or just text */}
                    <span className="w-full h-full bg-[#FF4B00] block"></span>
                </div>
                <span className="font-bold tracking-tighter text-lg text-white uppercase">
                    FitTracker
                </span>
            </div>

            <div>
                {user ? (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-zinc-800 border border-zinc-700">
                            <img
                                src={user.profileImageUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=kennykenntttt"}
                                alt="User"
                                className="w-full h-full object-cover grayscale opacity-80"
                            />
                        </div>
                        <button
                            onClick={() => stackClientApp.signOut()}
                            className="p-1 text-zinc-500 hover:text-white transition-colors"
                            aria-label="Sign out"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <Link
                        href="/handler/sign-in"
                        className="flex items-center gap-2 px-4 py-2 bg-[#FF4B00] text-white text-xs font-bold uppercase tracking-widest hover:bg-[#D43D00] transition-opacity"
                    >
                        <span>Sign In</span>
                    </Link>
                )}
            </div>
        </header>
    );
}
