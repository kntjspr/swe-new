import { NextResponse } from "next/server";
import { query, initializeDatabase } from "@/lib/db";
import { stackServerApp } from "@/stack/server";

interface WorkoutStats {
    total_workouts: string;
    total_calories: string;
    total_duration: string;
    completed_workouts: string;
}

interface RecentWorkout {
    id: number;
    name: string;
    muscles: string[];
    duration: number;
    created_at: string;
}

// Initialize database on first request
let dbInitialized = false;
async function ensureDbInitialized() {
    if (!dbInitialized) {
        await initializeDatabase();
        dbInitialized = true;
    }
}

// GET - Fetch user's workout statistics
export async function GET() {
    try {
        await ensureDbInitialized();

        const user = await stackServerApp.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Get aggregated stats
        const statsResult = await query<WorkoutStats>(
            `SELECT 
        COUNT(*) as total_workouts,
        COALESCE(SUM(estimated_calories), 0) as total_calories,
        COALESCE(SUM(duration), 0) as total_duration,
        COUNT(CASE WHEN completed_at IS NOT NULL THEN 1 END) as completed_workouts
       FROM workouts 
       WHERE user_id = $1`,
            [user.id]
        );

        const stats = statsResult[0] || {
            total_workouts: "0",
            total_calories: "0",
            total_duration: "0",
            completed_workouts: "0",
        };

        // Get recent workouts (last 5)
        const recentWorkouts = await query<RecentWorkout>(
            `SELECT id, name, muscles, duration, created_at
       FROM workouts 
       WHERE user_id = $1 
       ORDER BY created_at DESC 
       LIMIT 5`,
            [user.id]
        );

        // Get unique muscle groups trained
        const muscleResult = await query<{ muscles: string[] }>(
            `SELECT DISTINCT unnest(muscles) as muscle FROM workouts WHERE user_id = $1`,
            [user.id]
        );
        const uniqueMuscles = muscleResult.map((r) => r.muscles).flat();

        return NextResponse.json({
            success: true,
            stats: {
                totalWorkouts: parseInt(stats.total_workouts) || 0,
                totalCalories: parseInt(stats.total_calories) || 0,
                totalDuration: parseInt(stats.total_duration) || 0,
                completedWorkouts: parseInt(stats.completed_workouts) || 0,
                uniqueMusclesTrained: uniqueMuscles.length,
            },
            recentWorkouts,
        });
    } catch (error) {
        console.error("Error fetching stats:", error);
        return NextResponse.json(
            { error: "Failed to fetch statistics" },
            { status: 500 }
        );
    }
}
