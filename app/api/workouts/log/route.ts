import { NextRequest, NextResponse } from "next/server";
import { query, initializeDatabase } from "@/lib/db";
import { stackServerApp } from "@/stack/server";

// Initialize database on first request
let dbInitialized = false;
async function ensureDbInitialized() {
    if (!dbInitialized) {
        await initializeDatabase();
        // Create workout_logs table if it doesn't exist
        await query(`
      CREATE TABLE IF NOT EXISTS workout_logs (
        id SERIAL PRIMARY KEY,
        user_id VARCHAR(255) NOT NULL,
        workout_id INTEGER REFERENCES workouts(id) ON DELETE CASCADE,
        duration_seconds INTEGER NOT NULL,
        progress JSONB NOT NULL,
        completed_at TIMESTAMP WITH TIME ZONE NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );
      CREATE INDEX IF NOT EXISTS idx_workout_logs_user_id ON workout_logs(user_id);
      CREATE INDEX IF NOT EXISTS idx_workout_logs_workout_id ON workout_logs(workout_id);
    `);
        dbInitialized = true;
    }
}

interface WorkoutLog {
    id: number;
    user_id: string;
    workout_id: number;
    duration_seconds: number;
    progress: unknown;
    completed_at: string;
    created_at: string;
}

// POST - Log a workout completion
export async function POST(request: NextRequest) {
    try {
        await ensureDbInitialized();

        const user = await stackServerApp.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { workoutId, duration, progress, completedAt } = body;

        if (!workoutId || duration === undefined || !progress) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const log = await query<WorkoutLog>(
            `INSERT INTO workout_logs (user_id, workout_id, duration_seconds, progress, completed_at)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
            [user.id, workoutId, duration, JSON.stringify(progress), completedAt || new Date().toISOString()]
        );

        // Update the workout's completed_at timestamp
        await query(
            `UPDATE workouts SET completed_at = $1 WHERE id = $2 AND user_id = $3`,
            [completedAt || new Date().toISOString(), workoutId, user.id]
        );

        return NextResponse.json({ success: true, log: log[0] });
    } catch (error) {
        console.error("Error logging workout:", error);
        return NextResponse.json(
            { error: "Failed to log workout" },
            { status: 500 }
        );
    }
}

// GET - Get workout logs for a user
export async function GET(request: NextRequest) {
    try {
        await ensureDbInitialized();

        const user = await stackServerApp.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const workoutId = searchParams.get("workoutId");

        let logs: WorkoutLog[];
        if (workoutId) {
            logs = await query<WorkoutLog>(
                `SELECT wl.*, w.name as workout_name 
         FROM workout_logs wl
         JOIN workouts w ON w.id = wl.workout_id
         WHERE wl.user_id = $1 AND wl.workout_id = $2
         ORDER BY wl.completed_at DESC`,
                [user.id, workoutId]
            );
        } else {
            logs = await query<WorkoutLog>(
                `SELECT wl.*, w.name as workout_name 
         FROM workout_logs wl
         JOIN workouts w ON w.id = wl.workout_id
         WHERE wl.user_id = $1
         ORDER BY wl.completed_at DESC
         LIMIT 50`,
                [user.id]
            );
        }

        return NextResponse.json({ success: true, logs });
    } catch (error) {
        console.error("Error fetching workout logs:", error);
        return NextResponse.json(
            { error: "Failed to fetch workout logs" },
            { status: 500 }
        );
    }
}
