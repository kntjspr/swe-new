"use client";

import { useUser } from "@stackframe/stack";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const user = useUser();
    const router = useRouter();

    useEffect(() => {
        // If user is null, it might be loading or not signed in.
        // Stackframe's useUser usually returns undefined while loading, null if not signed in.
        // However, for immediate redirect, we can check.

        // We'll let the layout handle the initial check, but this acts as a gate.
        if (user === null) {
            router.push("/");
        }
    }, [user, router]);

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black text-white">
                <Loader2 className="w-8 h-8 animate-spin text-[#FF4B00]" />
            </div>
        );
    }

    return <>{children}</>;
}
