"use client";

import { ArrowRight, Dumbbell } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <section className="fade-in p-6 md:p-0">
      <header className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
            Transform Your<br />
            <span className="text-zinc-400">Fitness Journey</span>
          </h1>
        </div>
        <Link
          href="/generate"
          className="hidden md:flex items-center gap-2 bg-[#FF4B00] hover:bg-[#E04100] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-lg shadow-[#FF4B00]/25 transform hover:scale-105"
        >
          <span>New Workout</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </header>

      <div className="grid grid-cols-2 gap-5 mb-10">
        {/* Stat Card 1 */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow border border-zinc-50 dark:border-zinc-800 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#FF4B00]/5 rounded-full group-hover:bg-[#FF4B00]/10 transition-colors"></div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF4B00]"></div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Categories
            </span>
          </div>
          <div className="mt-2">
            <span className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              3
            </span>
            <span className="text-sm font-medium text-zinc-400 ml-1">
              workouts
            </span>
          </div>
          <div className="mt-4 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#FF4B00] h-full rounded-full w-3/5"></div>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow border border-zinc-50 dark:border-zinc-800 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#0080FF]/5 rounded-full group-hover:bg-[#0080FF]/10 transition-colors"></div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[#0080FF]"></div>
            <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
              Progress
            </span>
          </div>
          <div className="mt-2">
            <span className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
              12.5
            </span>
            <span className="text-sm font-medium text-zinc-400 ml-1">
              k lbs
            </span>
          </div>
          <div className="mt-4 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
            <div className="bg-[#0080FF] h-full rounded-full w-4/5"></div>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
            Recent Activity
          </h2>
          <button className="text-xs font-semibold text-[#FF4B00] hover:text-[#E04100]">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {/* History Item */}
          <div className="group bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-zinc-100 dark:border-zinc-800 hover:border-[#FF4B00]/30 transition-all cursor-pointer shadow-sm hover:shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-[#FF4B00] group-hover:text-white transition-colors">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-zinc-900 dark:text-white font-display">
                    Upper Body Power
                  </h3>
                  <p className="text-xs font-medium text-zinc-400 mt-1">
                    Yesterday • 45 min
                  </p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:border-[#FF4B00] group-hover:text-[#FF4B00] transition-all">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
