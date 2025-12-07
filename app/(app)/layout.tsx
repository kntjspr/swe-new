import { Suspense } from "react";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import MobileHeader from "../components/MobileHeader";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <ProtectedRoute>
            <div className="flex bg-black h-screen overflow-hidden font-mono text-white selection:bg-[#FF4B00] selection:text-white">
                <Suspense fallback={<aside className="hidden md:flex flex-col w-72 bg-black border-r border-zinc-800 h-screen sticky top-0 p-8 z-10" />}>
                    <Sidebar />
                </Suspense>
                <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
                    <Suspense fallback={<header className="md:hidden flex items-center justify-between px-6 py-4 bg-black sticky top-0 z-40 border-b border-zinc-800 h-[68px]" />}>
                        <MobileHeader />
                    </Suspense>
                    <main className="flex-1 overflow-y-auto relative bg-black">
                        <div className="max-w-5xl mx-auto min-h-full pb-32 md:p-10 md:pb-10">
                            {children}
                        </div>
                    </main>
                </div>
                <Suspense fallback={<div className="md:hidden fixed bottom-0 left-0 right-0 h-20 bg-black/90 backdrop-blur-xl border-t border-zinc-800 z-50 pb-safe" />}>
                    <MobileNav />
                </Suspense>
            </div>
        </ProtectedRoute>
    );
}
