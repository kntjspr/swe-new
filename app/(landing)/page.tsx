"use client";

import Link from "next/link";
import LandingHeader from "../components/LandingHeader";
import { ArrowRight, Smartphone, Shield, Star } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="flex flex-col min-h-screen bg-black text-white font-mono selection:bg-[#FF4B00] selection:text-white">
            <LandingHeader />

            <main className="flex-1 flex flex-col">
                {/* Hero Section */}
                <section className="flex-1 flex flex-col items-center justify-center p-6 pt-32 md:p-12 md:pt-40 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/50 via-black to-black opacity-50 z-0 pointer-events-none"></div>

                    <div className="max-w-4xl w-full relative z-10 text-center space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-950/50 text-xs font-medium text-zinc-400 mb-4 animate-fade-in-up">
                            <span className="w-2 h-2 rounded-full bg-[#FF4B00]"></span>
                            <span>v2.0 Now Available</span>
                        </div>

                        <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9] md:leading-[0.85] mix-blend-difference">
                            Forge Your <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-500">Peak</span>
                            <br />
                            <span className="text-[#FF4B00]">Physique</span>
                        </h1>

                        <p className="max-w-xl mx-auto text-zinc-400 text-sm md:text-base leading-relaxed">
                            AI-powered workout generation, advanced analytics, and seamless tracking.
                            The ultimate tool for the modern athlete.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Link
                                href="/dashboard"
                                className="group h-12 px-8 flex items-center gap-2 bg-[#FF4B00] hover:bg-[#D43D00] text-white font-bold uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(255,75,0,0.3)] hover:shadow-[0_0_50px_rgba(255,75,0,0.5)]"
                            >
                                <span>Start Training</span>
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <a
                                href="#features"
                                className="h-12 px-8 flex items-center justify-center text-zinc-400 hover:text-white font-bold uppercase tracking-widest transition-colors"
                            >
                                Learn More
                            </a>
                        </div>
                    </div>
                </section>

                {/* Marquee */}
                <div className="border-y border-white/10 bg-black py-4 overflow-hidden relative">
                    <div className="animate-marquee whitespace-nowrap flex font-black text-4xl uppercase tracking-tighter select-none opacity-50 text-zinc-800">
                        <div className="flex gap-12 pr-12">
                            <span>Strength</span> <span>Endurance</span> <span>Power</span> <span>Hypertrophy</span>
                            <span>Strength</span> <span>Endurance</span> <span>Power</span> <span>Hypertrophy</span>
                        </div>
                        <div className="flex gap-12 pr-12">
                            <span>Strength</span> <span>Endurance</span> <span>Power</span> <span>Hypertrophy</span>
                            <span>Strength</span> <span>Endurance</span> <span>Power</span> <span>Hypertrophy</span>
                        </div>
                    </div>
                </div>

                {/* Benton Grid Features */}
                <section id="features" className="bg-black p-4 py-20 md:p-20 relative z-10">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-4">
                        {/* Large Card */}
                        <div className="md:col-span-8 bg-zinc-950 border border-white/10 p-8 md:p-12 flex flex-col justify-between group hover:border-zinc-700 transition-colors min-h-[300px]">
                            <div>
                                <h3 className="text-3xl font-bold uppercase mb-4 text-white">AI Generator</h3>
                                <p className="text-zinc-400 font-mono max-w-sm">
                                    Input your time, equipment, and goals. Let our advanced algorithm build the perfect workout for you instantly.
                                </p>
                            </div>
                            <div className="self-end mt-8">
                                <div className="bg-[#FF4B00] text-black font-bold p-3 inline-block transform rotate-[-2deg] group-hover:rotate-0 transition-transform">
                                    TRY IT NOW →
                                </div>
                            </div>
                        </div>

                        {/* Tall Card */}
                        <div className="md:col-span-4 bg-zinc-900 border border-white/5 p-8 flex flex-col justify-between group hover:bg-[#FF4B00] transition-colors relative overflow-hidden">
                            <div className="h-full flex flex-col justify-center relative z-10">
                                <h3 className="text-2xl font-bold uppercase mb-2 text-white">History Logs</h3>
                                <p className="text-sm text-[#FF4B00] group-hover:text-white uppercase tracking-widest mb-4">Track Progress</p>
                                <p className="text-zinc-400 group-hover:text-white/80 font-mono text-sm">Keep a detailed record of every workout complete, duration, and calories burned.</p>
                            </div>
                        </div>

                        {/* Small Card */}
                        <div className="md:col-span-3 bg-white text-black p-8 flex flex-col justify-center items-center text-center relative overflow-hidden group hover:bg-[#FF4B00] transition-colors">
                            <h3 className="text-4xl font-black uppercase leading-none tracking-tighter mb-2 group-hover:scale-110 transition-transform">Free<br />Access</h3>
                            <p className="font-mono font-bold text-sm opacity-60">Start Now</p>
                        </div>

                        {/* Wide Card */}
                        <div className="md:col-span-9 bg-zinc-950 border border-white/10 p-8 flex flex-col md:flex-row items-center justify-between gap-8 group hover:border-white transition-colors">
                            <div className="text-left">
                                <h3 className="text-2xl font-bold uppercase mb-2 text-white">Responsive Design</h3>
                                <p className="text-zinc-400 font-mono max-w-lg">Designed for any device. Take your workouts with you to the gym, home, or on the go.</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center border border-white/20 group-hover:border-[#FF4B00] group-hover:text-[#FF4B00] transition-colors">
                                    <Smartphone className="w-5 h-5" />
                                </div>
                                <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center border border-white/20 group-hover:border-[#FF4B00] group-hover:text-[#FF4B00] transition-colors">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div className="w-12 h-12 bg-zinc-900 flex items-center justify-center border border-white/20 group-hover:border-[#FF4B00] group-hover:text-[#FF4B00] transition-colors">
                                    <Star className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer marquee */}
                <div className="border-t border-white/10 bg-black py-2 overflow-hidden relative">
                    <div className="animate-marquee-reverse whitespace-nowrap flex text-zinc-800 font-mono text-sm uppercase tracking-widest select-none">
                        <div className="flex gap-8 pr-8">
                            <span>FitTracker</span> <span>//</span> <span>Generate</span> <span>//</span> <span>Track</span> <span>//</span> <span>Analyze</span> <span>//</span>
                            <span>FitTracker</span> <span>//</span> <span>Generate</span> <span>//</span> <span>Track</span> <span>//</span> <span>Analyze</span> <span>//</span>
                            <span>FitTracker</span> <span>//</span> <span>Generate</span> <span>//</span> <span>Track</span> <span>//</span> <span>Analyze</span> <span>//</span>
                        </div>
                        <div className="flex gap-8 pr-8">
                            <span>FitTracker</span> <span>//</span> <span>Generate</span> <span>//</span> <span>Track</span> <span>//</span> <span>Analyze</span> <span>//</span>
                            <span>FitTracker</span> <span>//</span> <span>Generate</span> <span>//</span> <span>Track</span> <span>//</span> <span>Analyze</span> <span>//</span>
                            <span>FitTracker</span> <span>//</span> <span>Generate</span> <span>//</span> <span>Track</span> <span>//</span> <span>Analyze</span> <span>//</span>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

