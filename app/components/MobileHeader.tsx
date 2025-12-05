"use client";

import { useUser } from "@stackframe/stack";
import { stackClientApp } from "../../stack/client";
import { LogOut, User } from "lucide-react";
import Link from "next/link";

export default function MobileHeader() {
    const user = useUser();

    return (
        <header className="md:hidden flex items-center justify-between px-6 py-4 bg-white dark:bg-zinc-900 sticky top-0 z-40 border-b border-zinc-100 dark:border-zinc-800">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#FF4B00] rounded-lg flex items-center justify-center text-white font-bold tracking-tighter text-sm shadow-md shadow-[#FF4B00]/20">
                    F
                </div>
                <span className="font-display font-bold tracking-tight text-lg text-zinc-900 dark:text-white">
                    FitTracker
                </span>
            </div>

            <div>
                {user ? (
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-zinc-200 overflow-hidden ring-2 ring-white dark:ring-zinc-700">
                            <img
                                src={user.profileImageUrl || "https://api.dicebear.com/7.x/avataaars/svg?seed=kennykenntttt"}
                                alt="User"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button
                            onClick={() => stackClientApp.signOut()}
                            className="p-2 text-zinc-400 hover:text-red-500 transition-colors"
                            aria-label="Sign out"
                        >
                            <LogOut className="w-5 h-5" />
                        </button>
                    </div>
                ) : (
                    <Link
                        href="/handler/sign-in"
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-bold shadow-sm hover:opacity-90 transition-opacity"
                    >
                        <span>Sign In</span>
                        <User className="w-3.5 h-3.5" />
                    </Link>
                )}
            </div>
        </header>
    );
}
