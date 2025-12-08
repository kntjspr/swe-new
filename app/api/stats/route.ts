import { NextResponse } from "next/server";
import { query, initializeDatabase } from "@/lib/db";
import { stackServerApp } from "@/stack/server";

interface WorkoutLog {
    id: number;
    name: string;
    muscles: string[];
    duration: number;
    calories: number;
    completed_at: string;
}

interface WorkoutStats {
    completed_workouts: string;
    total_calories: string;
    total_duration: string;
}

// Initialize database on first request
let dbInitialized = false;
async function ensureDbInitialized() {
    if (!dbInitialized) {
        await initializeDatabase();
        dbInitialized = true;
    }
}

// Helper to parse PostgreSQL array string to JS array
function parsePostgresArray(value: unknown): string[] {
    if (Array.isArray(value)) {
        return value;
    }
    if (typeof value === 'string') {
        // Handle PostgreSQL array format: {value1,value2,value3}
        if (value.startsWith('{') && value.endsWith('}')) {
            const inner = value.slice(1, -1);
            if (inner === '') return [];
            return inner.split(',').map(s => s.trim().replace(/^"|"$/g, ''));
        }
        // Try parsing as JSON
        try {
            const parsed = JSON.parse(value);
            if (Array.isArray(parsed)) return parsed;
        } catch {
            // Not JSON, return empty array
        }
    }
    return [];
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
        const rawRecentWorkouts = await query<WorkoutLog>(
            `SELECT id, name, muscles, duration, completed_at
             FROM workout_logs 
             WHERE user_id = $1 
             ORDER BY completed_at DESC 
             LIMIT 5`,
            [user.id]
        );

        // Process recent workouts to ensure muscles is an array
        const recentWorkouts = rawRecentWorkouts.map(w => ({
            id: w.id,
            name: w.name,
            muscles: parsePostgresArray(w.muscles),
            duration: w.duration,
            created_at: w.completed_at,
        }));

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
