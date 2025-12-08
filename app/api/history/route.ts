import { NextRequest, NextResponse } from "next/server";
import { query, queryOne, initializeDatabase } from "@/lib/db";
import { stackServerApp } from "@/stack/server";

interface WorkoutLog {
    id: number;
    user_id: string;
    workout_id: number | null;
    name: string;
    duration: number;
    calories: number;
    muscles: string[];
    exercises: unknown;
    completed_at: string;
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

// GET - Fetch user's workout history (logs)
export async function GET() {
    try {
        await ensureDbInitialized();

        const user = await stackServerApp.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // Query workout logs directly - the schema now has all the fields we need
        const rawLogs = await query<WorkoutLog>(
            `SELECT * FROM workout_logs WHERE user_id = $1 ORDER BY completed_at DESC`,
            [user.id]
        );

        // Process logs to ensure proper data types
        const logs = rawLogs.map(log => {
            const muscles = parsePostgresArray(log.muscles);

            // Calculate exercise count from exercises JSON
            let exercise_count = 0;
            if (log.exercises) {
                try {
                    const exercisesData = typeof log.exercises === 'string'
                        ? JSON.parse(log.exercises)
                        : log.exercises;
                    if (exercisesData.original && Array.isArray(exercisesData.original)) {
                        exercise_count = exercisesData.original.length;
                    } else if (Array.isArray(exercisesData)) {
                        exercise_count = exercisesData.length;
                    }
                } catch {
                    // Keep exercise_count as 0
                }
            }

            return {
                id: log.id,
                name: log.name,
                muscles,
                duration: log.duration,
                calories: log.calories,
                exercise_count,
                completed_at: log.completed_at,
            };
        });

        return NextResponse.json({ success: true, logs });
    } catch (error) {
        console.error("Error fetching history:", error);
        return NextResponse.json(
            { error: "Failed to fetch history" },
            { status: 500 }
        );
    }
}

// POST - Log a completed workout
export async function POST(request: NextRequest) {
    try {
        await ensureDbInitialized();

        const user = await stackServerApp.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { workoutId, name, duration, calories, muscles, exercises } = body;

        console.log("Received workout log data:", { workoutId, name, duration, calories, muscles: muscles?.length, hasExercises: !!exercises });

        // Validate required fields
        if (!name || duration === undefined || duration === null || !muscles || !exercises) {
            console.error("Missing required fields:", { name: !!name, duration, muscles: !!muscles, exercises: !!exercises });
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const log = await queryOne<WorkoutLog>(
            `INSERT INTO workout_logs (user_id, workout_id, name, duration, calories, muscles, exercises)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
            [
                user.id,
                workoutId || null,
                name,
                duration,
                calories || 0,
                muscles,
                JSON.stringify(exercises),
            ]
        );

        console.log("Workout log saved successfully:", log?.id);
        return NextResponse.json({ success: true, log });
    } catch (error) {
        console.error("Error saving workout log:", error);
        return NextResponse.json(
            { error: "Failed to save workout log: " + (error instanceof Error ? error.message : "Unknown error") },
            { status: 500 }
        );
    }
}
