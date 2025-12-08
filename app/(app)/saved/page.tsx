

"use client";

import { useState, useEffect } from "react";
import {
    Clock,
    Flame,
    Dumbbell,
    Trash2,
    ChevronRight,
    Loader2,
    AlertCircle,
    CalendarDays,
} from "lucide-react";
import Link from "next/link";
import { useUser } from "@stackframe/stack";

type MuscleGroup =
    | "BICEPS"
    | "FOREARMS"
    | "CHEST"
    | "TRICEPS"
    | "ABDOMINALS"
    | "OBLIQUES"
    | "QUADRICEPS"
    | "SHOULDERS"
    | "CALVES"
    | "TRAPS"
    | "BACK"
    | "HAMSTRINGS"
    | "GLUTES";

interface Workout {
    id: number;
    name: string;
    muscles: MuscleGroup[];
    equipment: string[];
    duration: number;
    difficulty: string;
    exercises: unknown[];
    estimated_calories: number;
    created_at: string;
}

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

const difficultyColors: Record<string, string> = {
    beginner: "bg-green-500",
    intermediate: "bg-yellow-500",
    advanced: "bg-red-500",
};

export default function SavedWorkouts() {
    const user = useUser();
    const [workouts, setWorkouts] = useState<Workout[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);

    useEffect(() => {
        fetchWorkouts();
    }, []);

    const fetchWorkouts = async () => {
        try {
            const response = await fetch("/api/workouts");
            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    setWorkouts([]);
                    setError("Sign in to view your saved workouts");
                    return;
                }
                throw new Error(data.error || "Failed to fetch workouts");
            }

            setWorkouts(data.workouts || []);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const deleteWorkout = async (id: number) => {
        setDeletingId(id);
        try {
            const response = await fetch(`/api/workouts?id=${id}`, {
                method: "DELETE",
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to delete workout");
            }

            setWorkouts(workouts.filter((w) => w.id !== id));
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to delete");
        } finally {
            setDeletingId(null);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        });
    };

    return (
        <section className="fade-in p-6 md:p-0 pb-32 md:pb-0">
            <header className="mb-10 flex items-end justify-between border-b border-zinc-800 pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-white uppercase font-mono">
                        History
                    </h1>
                    <p className="text-xs text-zinc-500 mt-2 uppercase tracking-widest">
                        Library // {workouts.length} Routines
                    </p>
                </div>
            </header>

            {error && (
                <div className="mb-6 p-4 bg-red-900/10 border border-red-900/50 rounded-none flex items-center gap-3 text-red-500 font-mono text-sm">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-[#FF4B00]" />
                    <p className="text-xs text-zinc-500 mt-4 uppercase tracking-widest animate-pulse">Accessing Database...</p>
                </div>
            ) : workouts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center border border-zinc-800 bg-zinc-900/50 p-10">
                    <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 text-zinc-600">
                        <Dumbbell className="w-8 h-8" />
                    </div>
                    <h2 className="text-lg font-bold text-white mb-2 uppercase font-mono">
                        No Protocols Found
                    </h2>
                    <p className="text-sm text-zinc-500 mb-6 font-mono">
                        Generate and save a workout sequence to populate this library.
                    </p>
                    <Link
                        href="/generate"
                        className="inline-flex items-center gap-2 bg-[#FF4B00] hover:bg-[#D43D00] text-white px-6 py-3 text-sm font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(255,75,0,0.3)]"
                    >
                        <span>Init Generator</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {workouts.map((workout) => (
                        <div
                            key={workout.id}
                            className="group bg-zinc-900 border border-zinc-800 hover:border-[#FF4B00] transition-colors relative overflow-hidden flex flex-col md:flex-row"
                        >
                            <div className="p-6 flex-1">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-3">
                                            <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight">
                                                {workout.name}
                                            </h3>
                                            <div
                                                className={`w-2 h-2 ${difficultyColors[workout.difficulty] || "bg-zinc-600"}`}
                                                title={workout.difficulty}
                                            ></div>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-[#FF4B00] mt-1 font-bold uppercase tracking-wider">
                                            <CalendarDays className="w-3.5 h-3.5" />
                                            <span>{formatDate(workout.created_at)}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            deleteWorkout(workout.id);
                                        }}
                                        disabled={deletingId === workout.id}
                                        className="p-2 text-zinc-600 hover:text-red-500 transition-colors"
                                        title="Delete workout"
                                    >
                                        {deletingId === workout.id ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {workout.muscles.slice(0, 4).map((muscle) => (
                                        <span
                                            key={muscle}
                                            className="bg-black border border-zinc-700 text-zinc-400 px-2 py-1 text-[10px] font-bold uppercase tracking-widest"
                                        >
                                            {muscleLabels[muscle] || muscle}
                                        </span>
                                    ))}
                                    {workout.muscles.length > 4 && (
                                        <span className="bg-black border border-zinc-700 text-zinc-600 px-2 py-1 text-[10px] font-bold uppercase tracking-widest">
                                            +{workout.muscles.length - 4}
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-6 pt-4 border-t border-zinc-800">
                                    <div className="flex items-center gap-2 text-zinc-400 text-sm font-mono">
                                        <Clock className="w-4 h-4 text-zinc-600" />
                                        <span>{workout.duration} min</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-zinc-400 text-sm font-mono">
                                        <Flame className="w-4 h-4 text-zinc-600" />
                                        <span>{workout.estimated_calories} kcal</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-zinc-400 text-sm font-mono">
                                        <Dumbbell className="w-4 h-4 text-zinc-600" />
                                        <span>
                                            {Array.isArray(workout.exercises)
                                                ? workout.exercises.length
                                                : 0}{" "}
                                            ex
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href={`/workout/${workout.id}`}
                                className="w-full md:w-auto bg-[#FF4B00] hover:bg-[#D43D00] text-white flex items-center justify-center px-6 py-4 md:py-0 font-bold uppercase tracking-widest text-sm transition-colors"
                            >
                                <span className="md:hidden mr-2">Start Protocol</span>
                                <ChevronRight className="w-6 h-6" />
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

