"use client";

import { useState, useEffect, useCallback, use } from "react";
import {
    ArrowLeft,
    Play,
    Pause,
    RotateCcw,
    Check,
    Clock,
    Flame,
    Dumbbell,
    ChevronDown,
    ChevronUp,
    Loader2,
    Calendar,
    CheckCircle2,
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

interface Exercise {
    id: string;
    name: string;
    muscles: MuscleGroup[];
    sets: number;
    reps: string;
    restSeconds: number;
    tip: string;
}

interface Workout {
    id: number;
    name: string;
    muscles: MuscleGroup[];
    equipment: string[];
    duration: number;
    difficulty: string;
    exercises: Exercise[];
    estimated_calories: number;
    created_at: string;
}

interface ExerciseProgress {
    [exerciseId: string]: {
        completedSets: number[];
        repsPerSet: { [setIndex: number]: number };
    };
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

export default function WorkoutDetail({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const resolvedParams = use(params);
    const [workout, setWorkout] = useState<Workout | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [expandedExercise, setExpandedExercise] = useState<string | null>(null);

    // Timer state
    const [timerSeconds, setTimerSeconds] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [restTimerSeconds, setRestTimerSeconds] = useState(0);
    const [isRestTimerRunning, setIsRestTimerRunning] = useState(false);

    // Progress tracking
    const [progress, setProgress] = useState<ExerciseProgress>({});
    const [workoutStarted, setWorkoutStarted] = useState(false);
    const [workoutCompleted, setWorkoutCompleted] = useState(false);

    useEffect(() => {
        fetchWorkout();
    }, [resolvedParams.id]);

    // Main workout timer
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isTimerRunning) {
            interval = setInterval(() => {
                setTimerSeconds((s) => s + 1);
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isTimerRunning]);

    // Rest timer countdown
    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isRestTimerRunning && restTimerSeconds > 0) {
            interval = setInterval(() => {
                setRestTimerSeconds((s) => {
                    if (s <= 1) {
                        setIsRestTimerRunning(false);
                        // Play a sound or vibrate when rest is done
                        if ("vibrate" in navigator) {
                            navigator.vibrate([200, 100, 200]);
                        }
                        return 0;
                    }
                    return s - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isRestTimerRunning, restTimerSeconds]);

    const fetchWorkout = async () => {
        try {
            const response = await fetch("/api/workouts");
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to fetch workout");
            }

            const found = data.workouts?.find(
                (w: Workout) => w.id === parseInt(resolvedParams.id)
            );
            if (!found) {
                throw new Error("Workout not found");
            }

            setWorkout(found);

            // Initialize progress tracking
            const initialProgress: ExerciseProgress = {};
            if (Array.isArray(found.exercises)) {
                found.exercises.forEach((ex: Exercise) => {
                    initialProgress[ex.id] = { completedSets: [], repsPerSet: {} };
                });
            }
            setProgress(initialProgress);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    const startWorkout = () => {
        setWorkoutStarted(true);
        setIsTimerRunning(true);
    };

    const toggleTimer = () => {
        setIsTimerRunning(!isTimerRunning);
    };

    const startRestTimer = (seconds: number) => {
        setRestTimerSeconds(seconds);
        setIsRestTimerRunning(true);
    };

    const toggleSetComplete = (exerciseId: string, setIndex: number) => {
        const exercise = workout?.exercises?.find((e) => e.id === exerciseId);
        const isCurrentlyComplete = progress[exerciseId]?.completedSets.includes(setIndex);

        // Start rest timer if we are marking the set as complete
        if (!isCurrentlyComplete && exercise) {
            startRestTimer(exercise.restSeconds);
        }

        setProgress((prev) => {
            const exerciseProgress = prev[exerciseId] || {
                completedSets: [],
                repsPerSet: {},
            };
            const completedSets = [...exerciseProgress.completedSets];
            const repsPerSet = { ...exerciseProgress.repsPerSet };

            if (completedSets.includes(setIndex)) {
                completedSets.splice(completedSets.indexOf(setIndex), 1);
            } else {
                completedSets.push(setIndex);

                // If reps is blank, use the default rep amount from exercise
                if (!repsPerSet[setIndex] && exercise) {
                    // Parse the reps string (could be "10" or "8-12")
                    const defaultReps = parseInt(exercise.reps) || 10;
                    repsPerSet[setIndex] = defaultReps;
                }
            }

            return {
                ...prev,
                [exerciseId]: { ...exerciseProgress, completedSets, repsPerSet },
            };
        });
    };

    const updateReps = (exerciseId: string, setIndex: number, reps: number) => {
        // Prevent negative reps
        const safeReps = Math.max(0, reps);
        setProgress((prev) => {
            const exerciseProgress = prev[exerciseId] || {
                completedSets: [],
                repsPerSet: {},
            };
            return {
                ...prev,
                [exerciseId]: {
                    ...exerciseProgress,
                    repsPerSet: { ...exerciseProgress.repsPerSet, [setIndex]: safeReps },
                },
            };
        });
    };

    const calculateProgress = useCallback(() => {
        if (!workout?.exercises || !Array.isArray(workout.exercises)) return 0;
        const totalSets = workout.exercises.reduce((sum, ex) => sum + ex.sets, 0);
        const completedSets = Object.values(progress).reduce(
            (sum, ex) => sum + ex.completedSets.length,
            0
        );
        return totalSets > 0 ? Math.round((completedSets / totalSets) * 100) : 0;
    }, [workout, progress]);

    const finishWorkout = async () => {
        setIsTimerRunning(false);
        setWorkoutCompleted(true);

        // Log the workout completion
        try {
            await fetch("/api/history", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    workoutId: workout?.id,
                    name: workout?.name,
                    duration: Math.max(1, Math.round(timerSeconds / 60)), // Convert seconds to minutes, minimum 1
                    calories: workout?.estimated_calories, // Use estimated for now, or calculate
                    muscles: workout?.muscles,
                    exercises: {
                        original: workout?.exercises,
                        progress: progress
                    },
                }),
            });
        } catch (err) {
            console.error("Failed to log workout:", err);
        }
    };

    if (isLoading) {
        return (
            <section className="fade-in p-6 md:p-0 flex items-center justify-center min-h-[50vh]">
                <Loader2 className="w-8 h-8 animate-spin text-[#FF4B00]" />
            </section>
        );
    }

    if (error || !workout) {
        return (
            <section className="fade-in p-6 md:p-0">
                <Link
                    href="/history"
                    className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-[#FF4B00] transition-colors mb-6"
                >
                    <ArrowLeft className="w-4 h-4" />
                    Back to History
                </Link>
                <div className="text-center py-20">
                    <p className="text-zinc-500">{error || "Workout not found"}</p>
                </div>
            </section>
        );
    }

    const exercises = Array.isArray(workout.exercises) ? workout.exercises : [];
    const progressPercent = calculateProgress();

    return (
        <section className="fade-in p-6 md:px-8 lg:px-12 max-w-7xl mx-auto pb-40 md:pb-10">
            {/* Header */}
            <header className="mb-8 flex items-end justify-between border-b border-zinc-800 pb-6">
                <div>
                    <Link
                        href="/history"
                        className="inline-flex items-center gap-2 text-xs font-bold text-zinc-500 hover:text-[#FF4B00] transition-colors uppercase tracking-widest mb-3"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to History
                    </Link>
                    <h1 className="text-2xl font-bold tracking-tight text-white uppercase font-mono">
                        Active_Session
                    </h1>
                </div>
            </header>

            {/* Workout Info Card */}
            <div className="bg-gradient-to-br from-[#FF4B00] to-[#FF6B00] p-6 text-white shadow-xl shadow-[#FF4B00]/20 mb-8">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <h2 className="text-xl font-bold font-mono uppercase tracking-tight">{workout.name}</h2>
                        <div className="flex flex-wrap gap-2 mt-3">
                            {workout.muscles.slice(0, 4).map((muscle) => (
                                <span
                                    key={muscle}
                                    className="bg-white/20 px-2 py-1 text-[10px] font-bold uppercase tracking-widest"
                                >
                                    {muscleLabels[muscle] || muscle}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div
                        className={`w-3 h-3 rounded-full ${difficultyColors[workout.difficulty] || "bg-zinc-400"}`}
                    ></div>
                </div>

                <div className="grid grid-cols-3 gap-3 mt-6">
                    <div className="bg-white/10 p-4 text-center">
                        <Clock className="w-5 h-5 mx-auto mb-2 opacity-80" />
                        <div className="text-lg font-bold font-mono">{workout.duration}</div>
                        <div className="text-[10px] opacity-70 uppercase tracking-widest">minutes</div>
                    </div>
                    <div className="bg-white/10 p-4 text-center">
                        <Flame className="w-5 h-5 mx-auto mb-2 opacity-80" />
                        <div className="text-lg font-bold font-mono">{workout.estimated_calories}</div>
                        <div className="text-[10px] opacity-70 uppercase tracking-widest">calories</div>
                    </div>
                    <div className="bg-white/10 p-4 text-center">
                        <Dumbbell className="w-5 h-5 mx-auto mb-2 opacity-80" />
                        <div className="text-lg font-bold font-mono">{exercises.length}</div>
                        <div className="text-[10px] opacity-70 uppercase tracking-widest">exercises</div>
                    </div>
                </div>
            </div>

            {/* Timer Section */}
            {workoutStarted && !workoutCompleted && (
                <div className="bg-zinc-900 border border-zinc-800 p-6 mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-1">
                                Workout Timer
                            </div>
                            <div className="text-4xl font-bold text-white font-mono">
                                {formatTime(timerSeconds)}
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={toggleTimer}
                                className={`w-12 h-12 flex items-center justify-center transition-all ${isTimerRunning
                                    ? "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                    : "bg-[#FF4B00] text-white hover:bg-[#E04100]"
                                    }`}
                            >
                                {isTimerRunning ? (
                                    <Pause className="w-5 h-5" />
                                ) : (
                                    <Play className="w-5 h-5 ml-0.5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Rest Timer */}
                    {isRestTimerRunning && (
                        <div className="mt-4 p-4 bg-[#0080FF]/10 border border-[#0080FF]/30">
                            <div className="flex items-center justify-between">
                                <div>
                                    <div className="text-xs font-bold uppercase tracking-widest text-[#0080FF] mb-1">
                                        Rest Timer
                                    </div>
                                    <div className="text-2xl font-bold text-[#0080FF] font-mono">
                                        {formatTime(restTimerSeconds)}
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsRestTimerRunning(false)}
                                    className="text-xs font-bold uppercase tracking-widest text-[#0080FF] hover:text-white transition-colors"
                                >
                                    Skip
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Progress Bar */}
                    <div className="mt-6">
                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-zinc-500 mb-2">
                            <span>Progress</span>
                            <span className="text-[#FF4B00]">{progressPercent}%</span>
                        </div>
                        <div className="w-full bg-zinc-800 h-2 overflow-hidden">
                            <div
                                className="bg-[#FF4B00] h-full transition-all duration-300"
                                style={{ width: `${progressPercent}%` }}
                            ></div>
                        </div>
                    </div>
                </div>
            )}

            {/* Workout Completed */}
            {workoutCompleted && (
                <div className="bg-green-900/20 border border-green-700 p-6 mb-8 text-center">
                    <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-3" />
                    <h2 className="text-xl font-bold text-green-400 mb-2 uppercase font-mono">
                        Workout Complete!
                    </h2>
                    <p className="text-sm text-green-400/80 font-mono">
                        Total time: {formatTime(timerSeconds)} • {progressPercent}% completed
                    </p>
                    <Link
                        href="/history"
                        className="inline-flex items-center gap-2 mt-4 px-6 py-3 bg-green-500 text-white text-xs font-bold uppercase tracking-widest hover:bg-green-600 transition-colors"
                    >
                        <Calendar className="w-4 h-4" />
                        View History
                    </Link>
                </div>
            )}

            {/* Start Workout Button */}
            {!workoutStarted && (
                <button
                    onClick={startWorkout}
                    className="w-full flex items-center justify-center gap-3 bg-[#FF4B00] hover:bg-[#E04100] text-white px-6 py-4 text-sm font-bold uppercase tracking-widest transition-all shadow-lg shadow-[#FF4B00]/25 mb-8"
                >
                    <Play className="w-5 h-5" />
                    <span>Start Workout</span>
                </button>
            )}

            {/* Exercise List */}
            <div className="space-y-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">
                    Exercises
                </h3>
                {exercises.map((exercise, index) => {
                    const exerciseProgress = progress[exercise.id] || {
                        completedSets: [],
                        repsPerSet: {},
                    };
                    const allSetsComplete =
                        exerciseProgress.completedSets.length >= exercise.sets;

                    return (
                        <div
                            key={exercise.id}
                            className={`bg-zinc-900 border transition-all overflow-hidden ${allSetsComplete
                                ? "border-green-700 bg-green-900/10"
                                : "border-zinc-800 hover:border-zinc-700"
                                }`}
                        >
                            <button
                                onClick={() =>
                                    setExpandedExercise(
                                        expandedExercise === exercise.id ? null : exercise.id
                                    )
                                }
                                className="w-full p-5 flex items-center justify-between text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <div
                                        className={`w-10 h-10 flex items-center justify-center font-bold text-sm transition-colors ${allSetsComplete
                                            ? "bg-green-500 text-white"
                                            : "bg-zinc-800 text-zinc-500"
                                            }`}
                                    >
                                        {allSetsComplete ? <Check className="w-5 h-5" /> : index + 1}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white font-mono uppercase">
                                            {exercise.name}
                                        </h4>
                                        <p className="text-xs text-zinc-500 mt-1 font-mono">
                                            {exerciseProgress.completedSets.length}/{exercise.sets} sets
                                            × {exercise.reps}
                                        </p>
                                    </div>
                                </div>
                                {expandedExercise === exercise.id ? (
                                    <ChevronUp className="w-5 h-5 text-zinc-400" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-zinc-400" />
                                )}
                            </button>

                            {expandedExercise === exercise.id && (
                                <div className="px-5 pb-5 border-t border-zinc-800">
                                    {/* Sets Tracking */}
                                    {workoutStarted && !workoutCompleted && (
                                        <div className="mt-4 space-y-3">
                                            {Array.from({ length: exercise.sets }).map((_, setIdx) => {
                                                const isComplete =
                                                    exerciseProgress.completedSets.includes(setIdx);
                                                const repsLogged =
                                                    exerciseProgress.repsPerSet[setIdx] || "";

                                                return (
                                                    <div
                                                        key={setIdx}
                                                        className={`flex items-center gap-4 p-3 transition-colors ${isComplete
                                                            ? "bg-green-900/20 border border-green-700"
                                                            : "bg-zinc-800 border border-zinc-700"
                                                            }`}
                                                    >
                                                        <button
                                                            onClick={() =>
                                                                toggleSetComplete(exercise.id, setIdx)
                                                            }
                                                            className={`w-8 h-8 border-2 flex items-center justify-center transition-all ${isComplete
                                                                ? "bg-green-500 border-green-500 text-white"
                                                                : "border-zinc-600 hover:border-[#FF4B00]"
                                                                }`}
                                                        >
                                                            {isComplete && <Check className="w-4 h-4" />}
                                                        </button>
                                                        <div className="flex-1">
                                                            <div className="text-sm font-bold text-white font-mono">
                                                                Set {setIdx + 1}
                                                            </div>
                                                            <div className="text-xs text-zinc-500 font-mono">
                                                                Target: {exercise.reps}
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <input
                                                                type="number"
                                                                min="0"
                                                                placeholder="Reps"
                                                                value={repsLogged}
                                                                onChange={(e) =>
                                                                    updateReps(
                                                                        exercise.id,
                                                                        setIdx,
                                                                        Math.max(0, parseInt(e.target.value) || 0)
                                                                    )
                                                                }
                                                                className="w-16 px-3 py-2 text-sm font-bold text-center border border-zinc-700 bg-zinc-900 text-white font-mono"
                                                            />
                                                        </div>
                                                    </div>
                                                );
                                            })}


                                        </div>
                                    )}

                                    {/* Exercise Tip */}
                                    <div className="bg-[#FF4B00]/10 border border-[#FF4B00]/30 p-4 mt-4">
                                        <div className="flex items-start gap-2">
                                            <span className="text-[#FF4B00] text-lg">💡</span>
                                            <div>
                                                <h5 className="text-xs font-bold text-[#FF4B00] uppercase tracking-widest mb-1">
                                                    Pro Tip
                                                </h5>
                                                <p className="text-sm text-zinc-300">
                                                    {exercise.tip}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mt-4">
                                        {exercise.muscles.map((muscle) => (
                                            <span
                                                key={muscle}
                                                className="text-[10px] font-bold uppercase tracking-widest bg-zinc-800 text-zinc-400 px-2 py-1"
                                            >
                                                {muscleLabels[muscle] || muscle}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Finish Workout Button */}
            {workoutStarted && !workoutCompleted && (
                <button
                    onClick={finishWorkout}
                    className="fixed bottom-24 md:bottom-10 left-6 right-6 md:left-auto md:right-10 md:w-auto flex items-center justify-center gap-2 bg-[#FF4B00] hover:bg-[#E04100] text-white px-8 py-4 rounded-2xl text-sm font-bold transition-all shadow-xl shadow-[#FF4B00]/20 z-40"
                >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Finish Workout</span>
                </button>
            )}
        </section>
    );
}
