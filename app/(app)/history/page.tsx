"use client";

import { useState, useEffect } from "react";
import {
    Clock,
    Flame,
    Dumbbell,
    CalendarDays,
    Loader2,
    AlertCircle,
    Copy,
    Trash2
} from "lucide-react";

interface WorkoutLog {
    id: number;
    name: string;
    muscles: string[];
    duration: number;
    calories: number;
    exercise_count: number;
    completed_at: string;
}

const muscleLabels: Record<string, string> = {
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

export default function WorkoutHistory() {
    const [logs, setLogs] = useState<WorkoutLog[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        try {
            const response = await fetch("/api/history");
            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    setLogs([]);
                    setError("Sign in to view your history");
                    return;
                }
                throw new Error(data.error || "Failed to fetch history");
            }

            // Ensure muscles is always an array
            const processedLogs = (data.logs || []).map((log: any) => ({
                ...log,
                muscles: Array.isArray(log.muscles) ? log.muscles : []
            }));

            setLogs(processedLogs);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
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
                        Archive // {logs.length} Entries
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
            ) : logs.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center border border-zinc-800 bg-zinc-900/50 p-10">
                    <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 text-zinc-600">
                        <Dumbbell className="w-8 h-8" />
                    </div>
                    <h2 className="text-lg font-bold text-white mb-2 uppercase font-mono">
                        No Data Found
                    </h2>
                    <p className="text-sm text-zinc-500 mb-6 font-mono">
                        Initialize training protocols to populate logs.
                    </p>
                </div>
            ) : (
                <div className="space-y-4">
                    {logs.map((log) => (
                        <div
                            key={log.id}
                            className="bg-zinc-900 border border-zinc-800 hover:border-[#FF4B00] transition-colors p-6 group relative overflow-hidden"
                        >
                            <div className="flex items-start justify-between mb-4 relative z-10">
                                <div>
                                    <h3 className="text-lg font-bold text-white font-mono uppercase tracking-tight">
                                        {log.name}
                                    </h3>
                                    <div className="flex items-center gap-2 text-xs text-[#FF4B00] mt-1 font-bold uppercase tracking-wider">
                                        <CalendarDays className="w-3.5 h-3.5" />
                                        <span>{formatDate(log.completed_at)}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-6 relative z-10">
                                {log.muscles && log.muscles.slice(0, 4).map((muscle) => (
                                    <span
                                        key={muscle}
                                        className="bg-black border border-zinc-700 text-zinc-400 px-2 py-1 text-[10px] font-bold uppercase tracking-widest"
                                    >
                                        {muscleLabels[muscle] || muscle}
                                    </span>
                                ))}
                            </div>

                            <div className="flex items-center gap-6 pt-4 border-t border-zinc-800 relative z-10">
                                <div className="flex items-center gap-2 text-zinc-400 text-sm font-mono">
                                    <Clock className="w-4 h-4 text-zinc-600" />
                                    <span>{log.duration} min</span>
                                </div>
                                <div className="flex items-center gap-2 text-zinc-400 text-sm font-mono">
                                    <Flame className="w-4 h-4 text-zinc-600" />
                                    <span>{log.calories} kcal</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}
