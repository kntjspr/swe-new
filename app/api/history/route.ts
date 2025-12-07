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

// GET - Fetch user's workout history (logs)
export async function GET() {
    try {
        await ensureDbInitialized();

        const user = await stackServerApp.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const logs = await query<WorkoutLog>(
            `SELECT * FROM workout_logs WHERE user_id = $1 ORDER BY completed_at DESC`,
            [user.id]
        );

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

        // Validate required fields
        if (!name || !duration || !muscles || !exercises) {
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

        return NextResponse.json({ success: true, log });
    } catch (error) {
        console.error("Error saving workout log:", error);
        return NextResponse.json(
            { error: "Failed to save workout log" },
            { status: 500 }
        );
    }
}
