import { NextResponse } from "next/server";
import { query, initializeDatabase } from "@/lib/db";
import { stackServerApp } from "@/stack/server";

interface WorkoutStats {
    completed_workouts: string;
    total_calories: string;
    total_duration: string;
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

        // Get aggregated stats from workout_logs
        const statsResult = await query<WorkoutStats>(
            `SELECT 
        COUNT(*) as completed_workouts,
        COALESCE(SUM(calories), 0) as total_calories,
        COALESCE(SUM(duration), 0) as total_duration
       FROM workout_logs 
       WHERE user_id = $1`,
            [user.id]
        );

        const stats = statsResult[0] || {
            completed_workouts: "0",
            total_calories: "0",
            total_duration: "0",
        };

        // Get recent workouts (last 5) from workout_logs
        const recentWorkouts = await query<RecentWorkout>(
            `SELECT id, name, muscles, duration, completed_at as created_at
       FROM workout_logs 
       WHERE user_id = $1 
       ORDER BY completed_at DESC 
       LIMIT 5`,
            [user.id]
        );

        // Get unique muscle groups trained from workout_logs
        const muscleResult = await query<{ muscle: string }>(
            `SELECT DISTINCT unnest(muscles) as muscle FROM workout_logs WHERE user_id = $1`,
            [user.id]
        );
        const uniqueMuscles = muscleResult.map((r) => r.muscle);

        return NextResponse.json({
            success: true,
            stats: {
                totalWorkouts: parseInt(stats.completed_workouts) || 0,
                totalCalories: parseInt(stats.total_calories) || 0,
                totalDuration: parseInt(stats.total_duration) || 0,
                completedWorkouts: parseInt(stats.completed_workouts) || 0,
                uniqueMusclesTrained: uniqueMuscles.length,
                uniqueMusclesList: uniqueMuscles,
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
