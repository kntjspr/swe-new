"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Dumbbell, Flame, Clock, Loader2 } from "lucide-react";
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

interface Stats {
  totalWorkouts: number;
  totalCalories: number;
  totalDuration: number;
  completedWorkouts: number;
  uniqueMusclesTrained: number;
}

interface RecentWorkout {
  id: number;
  name: string;
  muscles: MuscleGroup[];
  duration: number;
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchStats();
    } else {
      setIsLoading(false);
    }
  }, [user]);

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

  const formatNumber = (num: number): string => {
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + "k";
    }
    return num.toString();
  };

  return (
    <section className="fade-in p-6 md:p-0 pb-32 md:pb-0">
      <header className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white leading-tight">
            {user ? (
              <>
                Welcome back,
                <br />
                <span className="text-zinc-400">
                  {user.displayName?.split(" ")[0] || "Athlete"}
                </span>
              </>
            ) : (
              <>
                Transform Your
                <br />
                <span className="text-zinc-400">Fitness Journey</span>
              </>
            )}
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

      {isLoading ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="w-6 h-6 animate-spin text-[#FF4B00]" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-5 mb-10">
            {/* Stat Card 1 - Workouts */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow border border-zinc-50 dark:border-zinc-800 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#FF4B00]/5 rounded-full group-hover:bg-[#FF4B00]/10 transition-colors"></div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF4B00]"></div>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Workouts
                </span>
              </div>
              <div className="mt-2">
                <span className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {stats?.totalWorkouts ?? 0}
                </span>
                <span className="text-sm font-medium text-zinc-400 ml-1">
                  saved
                </span>
              </div>
              <div className="mt-4 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#FF4B00] h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, (stats?.totalWorkouts ?? 0) * 10)}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Stat Card 2 - Calories */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow border border-zinc-50 dark:border-zinc-800 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#0080FF]/5 rounded-full group-hover:bg-[#0080FF]/10 transition-colors"></div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0080FF]"></div>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Calories
                </span>
              </div>
              <div className="mt-2">
                <span className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {formatNumber(stats?.totalCalories ?? 0)}
                </span>
                <span className="text-sm font-medium text-zinc-400 ml-1">
                  burned
                </span>
              </div>
              <div className="mt-4 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#0080FF] h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, ((stats?.totalCalories ?? 0) / 5000) * 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Stat Card 3 - Duration */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow border border-zinc-50 dark:border-zinc-800 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#10B981]/5 rounded-full group-hover:bg-[#10B981]/10 transition-colors"></div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#10B981]"></div>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Total Time
                </span>
              </div>
              <div className="mt-2">
                <span className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {stats?.totalDuration ?? 0}
                </span>
                <span className="text-sm font-medium text-zinc-400 ml-1">
                  min
                </span>
              </div>
              <div className="mt-4 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#10B981] h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${Math.min(100, ((stats?.totalDuration ?? 0) / 500) * 100)}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Stat Card 4 - Muscle Groups */}
            <div className="bg-white dark:bg-zinc-900 p-6 rounded-[24px] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow border border-zinc-50 dark:border-zinc-800 relative overflow-hidden group">
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-[#8B5CF6]/5 rounded-full group-hover:bg-[#8B5CF6]/10 transition-colors"></div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#8B5CF6]"></div>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  Muscles
                </span>
              </div>
              <div className="mt-2">
                <span className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-white">
                  {stats?.uniqueMusclesTrained ?? 0}
                </span>
                <span className="text-sm font-medium text-zinc-400 ml-1">
                  trained
                </span>
              </div>
              <div className="mt-4 w-full bg-zinc-100 dark:bg-zinc-800 rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#8B5CF6] h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${((stats?.uniqueMusclesTrained ?? 0) / 13) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white flex items-center gap-2">
                Recent Activity
              </h2>
              <Link
                href="/history"
                className="text-xs font-semibold text-[#FF4B00] hover:text-[#E04100]"
              >
                View All
              </Link>
            </div>

            {recentWorkouts.length === 0 ? (
              <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-100 dark:border-zinc-800 text-center">
                <Dumbbell className="w-10 h-10 text-zinc-300 dark:text-zinc-600 mx-auto mb-3" />
                <p className="text-sm text-zinc-500 mb-4">
                  No recent workouts yet
                </p>
                <Link
                  href="/generate"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#FF4B00] hover:text-[#E04100]"
                >
                  Create your first workout
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentWorkouts.map((workout) => (
                  <div
                    key={workout.id}
                    className="group bg-white dark:bg-zinc-900 p-5 rounded-3xl border border-zinc-100 dark:border-zinc-800 hover:border-[#FF4B00]/30 transition-all cursor-pointer shadow-sm hover:shadow-md"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-5">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-50 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-[#FF4B00] group-hover:text-white transition-colors">
                          <Dumbbell className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-base font-bold text-zinc-900 dark:text-white font-display">
                            {workout.name}
                          </h3>
                          <div className="flex items-center gap-3 text-xs font-medium text-zinc-400 mt-1">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {workout.duration} min
                            </span>
                            <span>•</span>
                            <span>{formatDate(workout.created_at)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-8 h-8 rounded-full border border-zinc-100 dark:border-zinc-800 flex items-center justify-center text-zinc-300 group-hover:border-[#FF4B00] group-hover:text-[#FF4B00] transition-all">
                        <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                    {workout.muscles.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-4">
                        {workout.muscles.slice(0, 3).map((muscle) => (
                          <span
                            key={muscle}
                            className="bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 px-2 py-1 rounded-md text-xs font-medium"
                          >
                            {muscleLabels[muscle] || muscle}
                          </span>
                        ))}
                        {workout.muscles.length > 3 && (
                          <span className="text-xs text-zinc-400">
                            +{workout.muscles.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Mobile CTA */}
          <Link
            href="/generate"
            className="md:hidden fixed bottom-24 left-6 right-6 flex items-center justify-center gap-2 bg-[#FF4B00] hover:bg-[#E04100] text-white px-6 py-4 rounded-2xl text-sm font-bold transition-all shadow-xl shadow-[#FF4B00]/30"
          >
            <Dumbbell className="w-5 h-5" />
            <span>Generate New Workout</span>
          </Link>
        </>
      )}
    </section>
  );
}
