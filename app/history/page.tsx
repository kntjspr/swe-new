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

export default function History() {
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
                    setError("Sign in to view your workout history");
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
        const now = new Date();
        const diffDays = Math.floor(
            (now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24)
        );

        if (diffDays === 0) return "Today";
        if (diffDays === 1) return "Yesterday";
        if (diffDays < 7) return `${diffDays} days ago`;

        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
        });
    };

    return (
        <section className="fade-in p-6 md:p-0 pb-32 md:pb-0">
            <header className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    Workout History
                </h1>
                <p className="text-sm font-medium text-zinc-400 mt-2">
                    Your saved workout routines.
                </p>
            </header>

            {error && (
                <div className="mb-6 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-2xl flex items-center gap-3 text-amber-600 dark:text-amber-400">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-medium">{error}</span>
                </div>
            )}

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-[#FF4B00]" />
                    <p className="text-sm text-zinc-400 mt-4">Loading your workouts...</p>
                </div>
            ) : workouts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-6">
                        <Dumbbell className="w-10 h-10 text-zinc-300 dark:text-zinc-600" />
                    </div>
                    <h2 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                        No workouts yet
                    </h2>
                    <p className="text-sm text-zinc-400 mb-6 max-w-xs">
                        Generate your first workout and save it to see it here.
                    </p>
                    <Link
                        href="/generate"
                        className="flex items-center gap-2 bg-[#FF4B00] hover:bg-[#E04100] text-white px-6 py-3 rounded-full text-sm font-semibold transition-all shadow-lg shadow-[#FF4B00]/25"
                    >
                        <span>Create Workout</span>
                        <ChevronRight className="w-4 h-4" />
                    </Link>
                </div>
            ) : (
                <div className="space-y-4">
                    {workouts.map((workout) => (
                        <div
                            key={workout.id}
                            className="bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
                        >
                            <div className="p-5">
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                                                {workout.name}
                                            </h3>
                                            <div
                                                className={`w-2 h-2 rounded-full ${difficultyColors[workout.difficulty] || "bg-zinc-400"}`}
                                                title={workout.difficulty}
                                            ></div>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-zinc-400 mt-1">
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
                                        className="p-2 rounded-xl text-zinc-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                                        title="Delete workout"
                                    >
                                        {deletingId === workout.id ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Trash2 className="w-4 h-4" />
                                        )}
                                    </button>
                                </div>

                                <div className="flex flex-wrap gap-2 mb-4">
                                    {workout.muscles.slice(0, 4).map((muscle) => (
                                        <span
                                            key={muscle}
                                            className="bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 px-2.5 py-1 rounded-full text-xs font-medium"
                                        >
                                            {muscleLabels[muscle] || muscle}
                                        </span>
                                    ))}
                                    {workout.muscles.length > 4 && (
                                        <span className="bg-zinc-100 dark:bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-full text-xs font-medium">
                                            +{workout.muscles.length - 4} more
                                        </span>
                                    )}
                                </div>

                                <div className="flex items-center gap-4 pt-4 border-t border-zinc-100 dark:border-zinc-800">
                                    <div className="flex items-center gap-2 text-zinc-500 text-sm">
                                        <Clock className="w-4 h-4" />
                                        <span>{workout.duration} min</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-zinc-500 text-sm">
                                        <Flame className="w-4 h-4" />
                                        <span>{workout.estimated_calories} cal</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-zinc-500 text-sm">
                                        <Dumbbell className="w-4 h-4" />
                                        <span>
                                            {Array.isArray(workout.exercises)
                                                ? workout.exercises.length
                                                : 0}{" "}
                                            exercises
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <Link
                                href={`/workout/${workout.id}`}
                                className="flex items-center justify-center gap-2 w-full py-3 bg-[#FF4B00] hover:bg-[#E04100] text-white text-sm font-semibold transition-colors"
                            >
                                <Dumbbell className="w-4 h-4" />
                                <span>Start Workout</span>
                                <ChevronRight className="w-4 h-4" />
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
