"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { useUser } from "@stackframe/stack";
import LandingHeader from "../components/LandingHeader";
import { ArrowRight, Smartphone, Shield, Star, Plus, Minus, Hash, Github } from "lucide-react";

export default function LandingPage() {
    const user = useUser();
    const router = useRouter();

    useEffect(() => {
        if (user) {
            router.push("/dashboard");
        }
    }, [user, router]);

    return (
        <div className="flex flex-col min-h-screen bg-black text-white font-mono selection:bg-[#FF4B00] selection:text-white">
            <LandingHeader />

            <main className="flex-1 flex flex-col pt-20">
                {/* Hero Section */}
                <section className="relative border-b border-t border-zinc-800 bg-zinc-950">
                    <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[80vh]">
                        {/* Left Column: Big Text */}
                        <div className="lg:col-span-8 border-r border-zinc-800 p-8 flex flex-col justify-between relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px] pointer-events-none"></div>

                            <div className="flex items-center gap-4 text-[#FF4B00] uppercase tracking-widest text-xs font-bold mb-12">
                                <span className="w-3 h-3 bg-[#FF4B00]"></span>
                                <span>System Status: Online</span>
                            </div>

                            <div className="relative z-10">
                                <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] mb-6">
                                    Fit<br />
                                    Tracker<br />
                                    <span className="text-outline text-transparent stroke-white" style={{ WebkitTextStroke: "2px white" }}>Pro</span>
                                </h1>
                            </div>

                            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center mt-12">
                                <Link
                                    href="/handler/sign-in"
                                    className="bg-[#FF4B00] hover:bg-white hover:text-black text-white px-8 py-4 text-xs font-bold uppercase tracking-[0.2em] transition-colors flex items-center gap-4"
                                >
                                    Start Protocol
                                    <ArrowRight className="w-4 h-4" />
                                </Link>
                                <div className="text-zinc-500 text-xs uppercase tracking-widest max-w-[200px] leading-relaxed">
                                    Advanced metrics for the modern physique.
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Interactive/Details */}
                        <div className="lg:col-span-4 flex flex-col h-full">
                            <div className="flex-1 border-b border-zinc-800 p-8 flex flex-col justify-center bg-zinc-900/50">
                                <div className="animate-pulse flex gap-2 mb-4">
                                    {[...Array(3)].map((_, i) => (
                                        <div key={i} className="w-2 h-2 bg-[#FF4B00]"></div>
                                    ))}
                                </div>
                                <p className="text-2xl font-bold uppercase leading-tight">
                                    "The only bad workout is the one that didn't happen."
                                </p>
                            </div>

                            <div className="flex-1 border-b border-zinc-800 p-8 flex flex-col justify-end bg-[url('https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1470&auto=format&fit=crop')] bg-cover bg-center bg-no-repeat grayscale hover:grayscale-0 transition-all duration-500">
                                <div className="bg-black/80 backdrop-blur-sm p-4 border border-zinc-800">
                                    <p className="text-xs text-zinc-400 uppercase mb-1">Latest Update</p>
                                    <p className="text-white font-bold uppercase">v1.0 Live Now</p>
                                </div>
                            </div>

                            <Link href="/handler/sign-up" className="h-32 p-4 bg-[#FF4B00] text-black flex items-center justify-between overflow-hidden relative group cursor-pointer">
                                <span className="absolute -right-4 -bottom-8 text-9xl font-black opacity-10 group-hover:opacity-20 transition-opacity">GO</span>
                                <div>
                                    <p className="font-bold text-4xl uppercase tracking-tighter">Join Now</p>
                                    <p className="text-sm font-bold uppercase tracking-widest opacity-70">Free Forever</p>
                                </div>
                                <ArrowRight className="w-8 h-8 group-hover:translate-x-2 transition-transform" />
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Infinite Marquees */}
                <div className="border-b border-zinc-800 bg-black overflow-hidden relative">
                    {/* Top Marquee */}
                    <div className="border-b border-zinc-800 py-3 bg-[#FF4B00] text-black">
                        <div className="animate-marquee whitespace-nowrap flex text-sm font-bold uppercase tracking-[0.2em]">
                            <div className="flex gap-16 pr-16 items-center">
                                {Array(8).fill("Initialize Sequence").map((text, i) => (
                                    <span key={i} className="flex items-center gap-4">
                                        {text} <Plus className="w-4 h-4" />
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-16 pr-16 items-center">
                                {Array(8).fill("Initialize Sequence").map((text, i) => (
                                    <span key={i} className="flex items-center gap-4">
                                        {text} <Plus className="w-4 h-4" />
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* Bottom Marquee (Reverse) */}
                    <div className="py-6">
                        <div className="animate-marquee-reverse whitespace-nowrap flex text-6xl font-black uppercase tracking-tighter text-zinc-900 select-none">
                            <div className="flex gap-12 pr-12">
                                <span>Power</span> <span className="text-outline-zinc">Speed</span> <span>Strength</span> <span className="text-outline-zinc">Endurance</span>
                                <span>Power</span> <span className="text-outline-zinc">Speed</span> <span>Strength</span> <span className="text-outline-zinc">Endurance</span>
                            </div>
                            <div className="flex gap-12 pr-12">
                                <span>Power</span> <span className="text-outline-zinc">Speed</span> <span>Strength</span> <span className="text-outline-zinc">Endurance</span>
                                <span>Power</span> <span className="text-outline-zinc">Speed</span> <span>Strength</span> <span className="text-outline-zinc">Endurance</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Asymmetric Grid Features */}
                <section className="bg-black p-4 py-20 relative z-10 border-b border-zinc-800">
                    <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-[1px] bg-zinc-800 border border-zinc-800">
                        {/* Card 1: AI Generator */}
                        <div className="md:col-span-2 md:row-span-2 bg-zinc-950 p-12 flex flex-col justify-between group hover:bg-[#FF4B00] hover:text-black transition-colors min-h-[500px]">
                            <div className="flex justify-between items-start">
                                <div className="border border-current px-3 py-1 text-xs font-bold uppercase tracking-widest">
                                    01 // Core
                                </div>
                                <Hash className="w-12 h-12 opacity-20" />
                            </div>
                            <div>
                                <h3 className="text-6xl font-black uppercase mb-6 tracking-tighter">AI<br />Generate</h3>
                                <p className="text-sm font-mono opacity-70 max-w-sm leading-relaxed border-l-2 border-current pl-4">
                                    Input your time, equipment, and goals. Let our advanced algorithm build the perfect workout for you instantly.
                                </p>
                            </div>
                        </div>

                        {/* Card 2: Analytics */}
                        <div className="md:col-span-1 bg-zinc-900/50 p-8 flex flex-col justify-between group hover:bg-white hover:text-black transition-colors min-h-[300px]">
                            <Shield className="w-8 h-8" />
                            <div>
                                <h3 className="text-2xl font-bold uppercase mb-2">Secure<br />Logs</h3>
                                <p className="text-xs uppercase tracking-widest opacity-60">Encrypted Data History</p>
                            </div>
                        </div>

                        {/* Card 3: Mobile */}
                        <div className="md:col-span-1 bg-zinc-900/50 p-8 flex flex-col justify-between group hover:bg-white hover:text-black transition-colors min-h-[300px]">
                            <Smartphone className="w-8 h-8" />
                            <div>
                                <h3 className="text-2xl font-bold uppercase mb-2">Any<br />Device</h3>
                                <p className="text-xs uppercase tracking-widest opacity-60">PWA Optimized</p>
                            </div>
                        </div>

                        {/* Card 4: Wide Stats */}
                        <div className="md:col-span-2 bg-black border-t border-zinc-800 p-10 flex flex-col md:flex-row items-center justify-between gap-8 group">
                            <div className="text-left">
                                <h3 className="text-4xl font-black uppercase mb-2 text-white">
                                    <span className="text-[#FF4B00]">Real-Time</span> Analytics
                                </h3>
                                <p className="text-zinc-500 text-xs uppercase tracking-widest">
                                    Track volume, intensity, and frequency.
                                </p>
                            </div>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((h) => (
                                    <div key={h} className="w-4 bg-zinc-800 hover:bg-[#FF4B00] transition-colors" style={{ height: `${h * 16}px` }}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer Section */}
                <footer className="bg-zinc-950 pt-20 pb-10 border-t border-zinc-800">
                    <div className="max-w-[1800px] mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                            <div className="col-span-2">
                                <h2 className="text-8xl font-black uppercase tracking-tighter text-zinc-900 select-none">
                                    Fit<br />Tracker
                                </h2>
                                <a
                                    href="https://github.com/kntjspr/swe-new"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 mt-8 text-zinc-500 hover:text-[#FF4B00] transition-colors border border-zinc-800 hover:border-[#FF4B00] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest"
                                >
                                    <Github className="w-4 h-4" />
                                    <span>Codebase</span>
                                </a>
                            </div>
                            <div>
                                <h4 className="text-[#FF4B00] text-xs font-bold uppercase tracking-widest mb-6">Sitemap</h4>
                                <ul className="space-y-4 text-sm font-bold uppercase tracking-wider text-zinc-400">
                                    <li><Link href="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
                                    <li><Link href="/generate" className="hover:text-white transition-colors">Generate</Link></li>
                                    <li><Link href="/history" className="hover:text-white transition-colors">History</Link></li>
                                    <li><Link href="/settings" className="hover:text-white transition-colors">Settings</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h4 className="text-[#FF4B00] text-xs font-bold uppercase tracking-widest mb-6">Legal</h4>
                                <ul className="space-y-4 text-sm font-bold uppercase tracking-wider text-zinc-400">
                                    <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                                    <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="border-t border-zinc-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-zinc-600 text-xs font-mono uppercase">
                                © 2025 FitTracker Ops. All Systems Nominal.
                            </p>
                            <div className="flex gap-4">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                <span className="text-xs text-green-500 font-bold uppercase tracking-widest">Server Active</span>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
