"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Dumbbell, Flame, Clock, Loader2, Activity, Play, Bookmark } from "lucide-react";
import Link from "next/link";
import { useUser } from "@stackframe/stack";
import MuscleSelector, { type MuscleGroup } from "../../components/MuscleSelector";

interface Stats {
  totalWorkouts: number;
  totalCalories: number;
  totalDuration: number;
  completedWorkouts: number;
  uniqueMusclesTrained: number;
  uniqueMusclesList: string[];
}

interface RecentWorkout {
  id: number;
  name: string;
  muscles: MuscleGroup[];
  duration: number;
  created_at: string;
}

interface SavedWorkout {
  id: number;
  name: string;
  muscles: MuscleGroup[];
  equipment: string[];
  duration: number;
  difficulty: string;
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


export default function Dashboard() {
  const user = useUser();

  const [stats, setStats] = useState<Stats | null>(null);
  const [recentWorkouts, setRecentWorkouts] = useState<RecentWorkout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<SavedWorkout[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMuscles, setSelectedMuscles] = useState<Set<MuscleGroup>>(new Set());

  useEffect(() => {
    if (user) {
      fetchStats();
      fetchSavedWorkouts();
    } else {
      setIsLoading(false);
    }
  }, [user]);

  useEffect(() => {
    if (stats?.uniqueMusclesList) {
      // Normalize and filter valid muscle groups
      const validMuscles = stats.uniqueMusclesList
        .map(m => m.toUpperCase())
        .filter(m => Object.keys(muscleLabels).includes(m)) as MuscleGroup[];

      setSelectedMuscles(new Set(validMuscles));
    }
  }, [stats]);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/stats");
      const data = await response.json();

      if (response.ok) {
        setStats(data.stats);
        setRecentWorkouts(data.recentWorkouts || []);
      }
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchSavedWorkouts = async () => {
    try {
      const response = await fetch("/api/workouts");
      const data = await response.json();

      if (response.ok) {
        setSavedWorkouts(data.workouts || []);
      }
    } catch (err) {
      console.error("Failed to fetch saved workouts:", err);
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

    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  };

  if (!user && isLoading) return null;

  return (
    <section className="fade-in p-6 md:p-0 pb-32 md:pb-0">
      <header className="mb-10 flex items-end justify-between border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white uppercase font-mono">
            Dashboard
          </h1>
          <p className="text-xs text-zinc-500 mt-2 uppercase tracking-widest">
            Overview // Biometrics
          </p>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-xs text-zinc-500 font-mono uppercase">
            System Online
          </span>
        </div>
      </header>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-[#FF4B00]" />
          <p className="text-xs text-zinc-500 mt-4 uppercase tracking-widest animate-pulse">
            Loading Data...
          </p>
        </div>
      ) : (
        <>
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-zinc-900 border border-zinc-800 p-6 relative overflow-hidden group hover:border-[#FF4B00] transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Dumbbell className="w-12 h-12 text-white" />
              </div>
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">
                Completed
              </p>
              <h3 className="text-3xl font-mono text-white">
                {stats?.completedWorkouts || 0}
              </h3>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-6 relative overflow-hidden group hover:border-[#FF4B00] transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Flame className="w-12 h-12 text-white" />
              </div>
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">
                Calories
              </p>
              <h3 className="text-3xl font-mono text-white">
                {(stats?.totalCalories || 0).toLocaleString()}
              </h3>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-6 relative overflow-hidden group hover:border-[#FF4B00] transition-colors">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                <Clock className="w-12 h-12 text-white" />
              </div>
              <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mb-1">
                Minutes
              </p>
              <h3 className="text-3xl font-mono text-white">
                {stats?.totalDuration || 0}
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Muscle Heatmap */}
            <div className="lg:col-span-1 bg-zinc-900 border border-zinc-800 p-6 flex flex-col items-center">
              <div className="w-full flex items-center justify-between mb-6">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest">
                  Muscle Heatmap
                </h3>
                <Activity className="w-4 h-4 text-[#FF4B00]" />
              </div>
              <div className="relative h-[300px] w-full">
                <MuscleSelector
                  selectedMuscles={selectedMuscles}
                  onSelectionChange={() => { }} // Read-only
                />
              </div>
              <div className="w-full mt-6 grid grid-cols-2 gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#FF4B00]"></div>
                  <span className="text-[10px] uppercase text-zinc-500 font-bold">
                    Trained
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#0080FF] opacity-20"></div>
                  <span className="text-[10px] uppercase text-zinc-500 font-bold">
                    Untrained
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="lg:col-span-2 space-y-4">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-4">
                Recent Activity
              </h3>
              {recentWorkouts.length === 0 ? (
                <div className="bg-zinc-900 border border-zinc-800 p-8 text-center">
                  <p className="text-zinc-500 font-mono text-sm">
                    No recent workouts found.
                  </p>
                  <Link
                    href="/generate"
                    className="inline-flex items-center gap-2 mt-4 text-[#FF4B00] hover:text-white transition-colors text-xs font-bold uppercase tracking-widest"
                  >
                    <span>Start Training</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                <div className="space-y-2">
                  {recentWorkouts.map((workout) => (
                    <div
                      key={workout.id}
                      className="bg-black border border-zinc-800 p-4 flex items-center justify-between group hover:border-zinc-600 transition-colors"
                    >
                      <div>
                        <h4 className="font-bold text-white font-mono uppercase">
                          {workout.name}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-[#FF4B00] font-bold">
                            {formatDate(workout.created_at)}
                          </span>
                          <span className="text-zinc-700 text-[10px] uppercase">
                            //
                          </span>
                          <span className="text-xs text-zinc-500">
                            {workout.duration} min
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        {workout.muscles.slice(0, 3).map((m) => (
                          <span
                            key={m}
                            className="bg-zinc-900 text-zinc-500 text-[10px] px-2 py-1 uppercase font-bold"
                          >
                            {muscleLabels[m].slice(0, 3)}
                          </span>
                        ))}
                        {workout.muscles.length > 3 && (
                          <span className="bg-zinc-900 text-zinc-500 text-[10px] px-2 py-1 uppercase font-bold">
                            +
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Saved Workouts */}
          {savedWorkouts.length > 0 && (
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-white uppercase tracking-widest flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-[#FF4B00]" />
                  Saved Workouts
                </h3>
                <Link
                  href="/saved"
                  className="text-xs text-zinc-500 hover:text-[#FF4B00] transition-colors uppercase tracking-widest"
                >
                  View All
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {savedWorkouts.slice(0, 6).map((workout) => (
                  <div
                    key={workout.id}
                    className="bg-zinc-900 border border-zinc-800 p-5 group hover:border-[#FF4B00] transition-all relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-[#FF4B00]/10 to-transparent"></div>
                    <div className="relative z-10">
                      <h4 className="font-bold text-white font-mono uppercase text-sm mb-2 truncate">
                        {workout.name}
                      </h4>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {workout.muscles.slice(0, 2).map((m) => (
                          <span
                            key={m}
                            className="bg-black text-zinc-500 text-[9px] px-2 py-0.5 uppercase font-bold"
                          >
                            {muscleLabels[m]?.slice(0, 3) || m.slice(0, 3)}
                          </span>
                        ))}
                        {workout.muscles.length > 2 && (
                          <span className="bg-black text-zinc-500 text-[9px] px-2 py-0.5 uppercase font-bold">
                            +{workout.muscles.length - 2}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-[10px] text-zinc-500 mb-4">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {workout.duration}m
                        </span>
                        <span className="flex items-center gap-1">
                          <Flame className="w-3 h-3" />
                          {workout.estimated_calories}cal
                        </span>
                      </div>
                      <Link
                        href={`/workout/${workout.id}`}
                        className="flex items-center justify-center gap-2 w-full py-2 bg-[#FF4B00] hover:bg-[#E04100] text-white text-xs font-bold uppercase tracking-wider transition-colors"
                      >
                        <Play className="w-3 h-3" />
                        Start
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Mobile CTA */}
          <Link
            href="/generate"
            className="md:hidden fixed bottom-24 left-6 right-6 flex items-center justify-center gap-2 bg-[#FF4B00] hover:bg-[#D43D00] text-white px-6 py-4 text-sm font-bold uppercase tracking-widest transition-all shadow-[0_0_20px_rgba(255,75,0,0.3)] z-50"
          >
            <Dumbbell className="w-5 h-5" />
            <span>Generate Workout</span>
          </Link>
        </>
      )}
    </section>
  );
}
