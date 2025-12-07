"use client";

import { useState } from "react";
import {
    Sparkles,
    Save,
    RotateCcw,
    Clock,
    Flame,
    Dumbbell,
    ChevronDown,
    ChevronUp,
    Loader2,
    Check,
    AlertCircle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import MuscleSelector, { type MuscleGroup } from "../../components/MuscleSelector";

type Equipment = "Bodyweight" | "Dumbbells" | "Barbell" | "Cable";
type Difficulty = "beginner" | "intermediate" | "advanced";

interface Exercise {
    id: string;
    name: string;
    muscles: MuscleGroup[];
    equipment: Equipment[];
    difficulty: Difficulty;
    sets: number;
    reps: string;
    restSeconds: number;
    tip: string;
    caloriesPerSet: number;
}

interface GeneratedWorkout {
    suggestedName: string;
    muscles: MuscleGroup[];
    equipment: Equipment[];
    duration: number;
    difficulty: Difficulty;
    exercises: Exercise[];
    estimatedCalories: number;
    estimatedMinutes: number;
}

export default function Generator() {
    const [selectedMuscles, setSelectedMuscles] = useState<Set<MuscleGroup>>(
        new Set()
    );
    const [selectedEquipment, setSelectedEquipment] = useState<Set<Equipment>>(
        new Set(["Bodyweight"])
    );
    const [duration, setDuration] = useState<number>(45);
    const [difficulty, setDifficulty] = useState<Difficulty>("intermediate");
    const [isGenerating, setIsGenerating] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [workout, setWorkout] = useState<GeneratedWorkout | null>(null);
    const [workoutName, setWorkoutName] = useState("");
    const [expandedExercise, setExpandedExercise] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [saveSuccess, setSaveSuccess] = useState(false);
    const router = useRouter();

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

    const difficultyColors: Record<Difficulty, string> = {
        beginner: "bg-green-500",
        intermediate: "bg-yellow-500",
        advanced: "bg-red-500",
    };

    const toggleEquipment = (item: Equipment) => {
        const newSelection = new Set(selectedEquipment);
        if (newSelection.has(item)) {
            if (newSelection.size > 1) {
                newSelection.delete(item);
            }
        } else {
            newSelection.add(item);
        }
        setSelectedEquipment(newSelection);
    };

    const generateWorkout = async () => {
        if (selectedMuscles.size === 0) {
            setError("Please select at least one muscle group");
            return;
        }

        setError(null);
        setIsGenerating(true);
        setSaveSuccess(false);

        try {
            const response = await fetch("/api/workouts/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    muscles: Array.from(selectedMuscles),
                    duration,
                    equipment: Array.from(selectedEquipment),
                    difficulty,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to generate workout");
            }

            setWorkout(data.workout);
            setWorkoutName(data.workout.suggestedName);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
            setIsGenerating(false);
        }
    };

    const saveWorkout = async () => {
        if (!workout) return;

        setIsSaving(true);
        setError(null);

        try {
            const response = await fetch("/api/workouts", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: workoutName || workout.suggestedName,
                    muscles: workout.muscles,
                    equipment: workout.equipment,
                    duration: workout.duration,
                    difficulty: workout.difficulty,
                    exercises: workout.exercises,
                    estimatedCalories: workout.estimatedCalories,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "Failed to save workout");
            }

            setSaveSuccess(true);
            setTimeout(() => {
                setSaveSuccess(false);
                router.push("/saved");
            }, 1000);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Failed to save workout");
        } finally {
            setIsSaving(false);
        }
    };

    const resetWorkout = () => {
        setWorkout(null);
        setWorkoutName("");
        setSaveSuccess(false);
    };

    return (
        <section className="fade-in p-6 md:p-0 pb-32 md:pb-0">
            <header className="mb-8">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white">
                    Generate Workout
                </h1>
                <p className="text-sm font-medium text-zinc-400 mt-2">
                    AI-powered recommendations based on your goals.
                </p>
            </header>

            {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-medium">{error}</span>
                </div>
            )}

            {!workout ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column: Inputs */}
                    <div className="space-y-6">
                        {/* Difficulty Selection */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 rounded-full bg-purple-500"></div>
                                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    Difficulty
                                </label>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                {(["beginner", "intermediate", "advanced"] as Difficulty[]).map(
                                    (level) => (
                                        <button
                                            key={level}
                                            onClick={() => setDifficulty(level)}
                                            className={`h-12 px-4 rounded-xl border text-xs font-bold capitalize transition-all ${difficulty === level
                                                ? "bg-[#FF4B00] text-white border-[#FF4B00] shadow-lg shadow-[#FF4B00]/25"
                                                : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                                }`}
                                        >
                                            {level}
                                        </button>
                                    )
                                )}
                            </div>
                        </div>

                        {/* Equipment Selection */}
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="w-2 h-2 rounded-full bg-[#FF4B00]"></div>
                                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    Equipment
                                </label>
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                {(
                                    ["Bodyweight", "Dumbbells", "Barbell", "Cable"] as Equipment[]
                                ).map((item) => (
                                    <button
                                        key={item}
                                        onClick={() => toggleEquipment(item)}
                                        className={`h-12 px-4 rounded-xl border text-xs font-bold transition-all ${selectedEquipment.has(item)
                                            ? "bg-[#FF4B00] text-white border-[#FF4B00] shadow-lg shadow-[#FF4B00]/25"
                                            : "border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                            }`}
                                    >
                                        {item}
                                    </button>
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

                        {/* Selected Muscles Display */}
                        <div className="bg-white dark:bg-zinc-900 p-5 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800">
                            <div className="flex items-center gap-2 mb-3">
                                <div className="w-2 h-2 rounded-full bg-[#0080FF]"></div>
                                <label className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                                    Focus Areas
                                </label>
                            </div>
                            <div className="flex flex-wrap gap-2 text-xs font-medium text-zinc-400 min-h-[24px]">
                                {selectedMuscles.size === 0 ? (
                                    <span>Tap body diagram to select muscles →</span>
                                ) : (
                                    Array.from(selectedMuscles).map((muscle) => (
                                        <span
                                            key={muscle}
                                            className="bg-[#FF4B00]/10 text-[#FF4B00] px-3 py-1.5 rounded-full font-semibold"
                                        >
                                            {muscleLabels[muscle]}
                                        </span>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Generate Button */}
                        <button
                            onClick={generateWorkout}
                            disabled={isGenerating || selectedMuscles.size === 0}
                            className="w-full flex items-center justify-center gap-3 bg-[#FF4B00] hover:bg-[#E04100] disabled:bg-zinc-300 dark:disabled:bg-zinc-700 text-white px-6 py-4 rounded-2xl text-sm font-bold transition-all shadow-lg shadow-[#FF4B00]/25 disabled:shadow-none transform hover:scale-[1.02] disabled:transform-none"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span>Generating...</span>
                                </>
                            ) : (
                                <>
                                    <Sparkles className="w-5 h-5" />
                                    <span>Generate Workout</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Right Column: Interactive Body */}
                    <div className="relative h-[450px] bg-white dark:bg-zinc-900 rounded-[32px] border border-zinc-200 dark:border-zinc-800 shadow-sm overflow-hidden flex flex-col items-center justify-center">
                        <div className="w-full h-full p-4 flex items-center justify-center">
                            <MuscleSelector
                                selectedMuscles={selectedMuscles}
                                onSelectionChange={setSelectedMuscles}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                /* Generated Workout Display */
                <div className="space-y-6">
                    {/* Workout Header */}
                    <div className="bg-gradient-to-br from-[#FF4B00] to-[#FF6B00] p-6 rounded-3xl text-white shadow-xl shadow-[#FF4B00]/20">
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={workoutName}
                                    onChange={(e) => setWorkoutName(e.target.value)}
                                    className="bg-transparent text-2xl font-bold w-full outline-none placeholder-white/50"
                                    placeholder="Workout Name"
                                />
                                <div className="flex flex-wrap gap-2 mt-3">
                                    {workout.muscles.map((muscle) => (
                                        <span
                                            key={muscle}
                                            className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold"
                                        >
                                            {muscleLabels[muscle]}
                                        </span>
                                    ))}
                                </div>
                            </div>
                            <div
                                className={`w-3 h-3 rounded-full ${difficultyColors[workout.difficulty]}`}
                                title={workout.difficulty}
                            ></div>
                        </div>

                        <div className="grid grid-cols-3 gap-4 mt-6">
                            <div className="bg-white/10 rounded-2xl p-4 text-center">
                                <Clock className="w-5 h-5 mx-auto mb-2 opacity-80" />
                                <div className="text-lg font-bold">
                                    {workout.estimatedMinutes}
                                </div>
                                <div className="text-xs opacity-70">minutes</div>
                            </div>
                            <div className="bg-white/10 rounded-2xl p-4 text-center">
                                <Flame className="w-5 h-5 mx-auto mb-2 opacity-80" />
                                <div className="text-lg font-bold">
                                    {workout.estimatedCalories}
                                </div>
                                <div className="text-xs opacity-70">calories</div>
                            </div>
                            <div className="bg-white/10 rounded-2xl p-4 text-center">
                                <Dumbbell className="w-5 h-5 mx-auto mb-2 opacity-80" />
                                <div className="text-lg font-bold">
                                    {workout.exercises.length}
                                </div>
                                <div className="text-xs opacity-70">exercises</div>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={saveWorkout}
                            disabled={isSaving || saveSuccess}
                            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-sm font-bold transition-all ${saveSuccess
                                ? "bg-green-500 text-white"
                                : "bg-[#FF4B00] hover:bg-[#E04100] text-white shadow-lg shadow-[#FF4B00]/25"
                                }`}
                        >
                            {isSaving ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : saveSuccess ? (
                                <Check className="w-5 h-5" />
                            ) : (
                                <Save className="w-5 h-5" />
                            )}
                            <span>{saveSuccess ? "Saved!" : "Save Workout"}</span>
                        </button>
                        <button
                            onClick={resetWorkout}
                            className="flex items-center justify-center gap-2 px-6 py-4 rounded-2xl text-sm font-bold bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-all"
                        >
                            <RotateCcw className="w-5 h-5" />
                            <span className="hidden sm:inline">New Workout</span>
                        </button>
                    </div>

                    {/* Exercise List */}
                    <div className="space-y-3">
                        <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                            Exercises
                        </h2>
                        {workout.exercises.map((exercise, index) => (
                            <div
                                key={exercise.id}
                                className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-100 dark:border-zinc-800 overflow-hidden shadow-sm"
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
                                        <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 font-bold text-sm">
                                            {index + 1}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-zinc-900 dark:text-white">
                                                {exercise.name}
                                            </h3>
                                            <p className="text-xs text-zinc-400 mt-1">
                                                {exercise.sets} sets × {exercise.reps}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-xs font-medium text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-3 py-1 rounded-full">
                                            {exercise.restSeconds}s rest
                                        </span>
                                        {expandedExercise === exercise.id ? (
                                            <ChevronUp className="w-5 h-5 text-zinc-400" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-zinc-400" />
                                        )}
                                    </div>
                                </button>

                                {expandedExercise === exercise.id && (
                                    <div className="px-5 pb-5 pt-0 border-t border-zinc-100 dark:border-zinc-800">
                                        <div className="bg-[#FF4B00]/5 dark:bg-[#FF4B00]/10 rounded-xl p-4 mt-4">
                                            <div className="flex items-start gap-2">
                                                <span className="text-[#FF4B00] text-lg">💡</span>
                                                <div>
                                                    <h4 className="text-xs font-bold text-[#FF4B00] uppercase tracking-wide mb-1">
                                                        Pro Tip
                                                    </h4>
                                                    <p className="text-sm text-zinc-600 dark:text-zinc-300">
                                                        {exercise.tip}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2 mt-4">
                                            {exercise.muscles.map((muscle) => (
                                                <span
                                                    key={muscle}
                                                    className="text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 px-3 py-1 rounded-full"
                                                >
                                                    {muscleLabels[muscle]}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    );
}
