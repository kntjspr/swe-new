"use client";

import { useState } from "react";
import MuscleSelector, { type MuscleGroup } from "../components/MuscleSelector";

export default function Generator() {
    const [selectedMuscles, setSelectedMuscles] = useState<Set<MuscleGroup>>(
        new Set()
    );
    const [duration, setDuration] = useState(45);

    const muscleLabels: Record<MuscleGroup, string> = {
        BICEPS: "Biceps",
        FOREARMS: "Forearms",
        CHEST: "Chest",
        TRICEPS: "Triceps",
        ABDOMINALS: "Abdominals",
        OBLIQUES: "Obliques",
        QUADRICEPS: "Quadriceps",
        SHOULDERS: "Shoulders",
        CALVES: "Calves",
        TRAPS: "Traps",
        BACK: "Back",
        HAMSTRINGS: "Hamstrings",
        GLUTES: "Glutes",
    };

    return (
        <section className="fade-in p-6 md:p-0">
            <header className="mb-10">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    Generate Workout
                </h1>
                <p className="text-sm font-medium text-zinc-400 mt-2">
                    AI-powered recommendations based on your goals.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Left Column: Inputs */}
                <div className="space-y-8">
                    {/* Equipment Selection */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-2 h-2 rounded-full bg-[#FF4B00]"></div>
                            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                                Equipment
                            </label>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                            {["Bodyweight", "Dumbbells", "Barbell", "Cable"].map((item) => (
                                <label key={item} className="cursor-pointer group">
                                    <input type="checkbox" className="custom-checkbox hidden" />
                                    <div className="h-12 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 flex items-center justify-center text-xs font-bold text-zinc-500 transition-all group-hover:bg-zinc-50 dark:group-hover:bg-zinc-800 shadow-sm">
                                        {item}
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Duration */}
                    <div className="bg-white dark:bg-zinc-900 p-5 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                        <div className="flex justify-between items-center mb-6">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-zinc-900 dark:bg-white"></div>
                                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    Duration
                                </label>
                            </div>
                            <span className="text-sm font-bold text-[#FF4B00] bg-[#FF4B00]/10 px-3 py-1 rounded-full">
                                {duration} min
                            </span>
                        </div>
                        <input
                            type="range"
                            min="15"
                            max="90"
                            step="15"
                            value={duration}
                            onChange={(e) => setDuration(Number(e.target.value))}
                        />
                        <div className="flex justify-between text-[10px] text-zinc-300 mt-3 font-bold uppercase tracking-widest">
                            <span>15m</span>
                            <span>90m</span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 p-5 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 rounded-full bg-[#0080FF]"></div>
                            <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                                Focus Areas
                            </label>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs font-medium text-zinc-400 min-h-[24px]">
                            {selectedMuscles.size === 0 ? (
                                <span>No muscles selected</span>
                            ) : (
                                Array.from(selectedMuscles).map((muscle) => (
                                    <span
                                        key={muscle}
                                        className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2 py-1 rounded-md"
                                    >
                                        {muscleLabels[muscle]}
                                    </span>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Right Column: Interactive Body */}
                <div className="relative h-[420px] bg-white dark:bg-zinc-900 rounded-[32px] border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col items-center justify-center group">
                    <div className="w-full h-full p-4 flex items-center justify-center">
                        <MuscleSelector
                            selectedMuscles={selectedMuscles}
                            onSelectionChange={setSelectedMuscles}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}
