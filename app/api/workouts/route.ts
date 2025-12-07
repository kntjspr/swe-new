import { NextRequest, NextResponse } from "next/server";
import { query, queryOne, initializeDatabase } from "@/lib/db";
import { stackServerApp } from "@/stack/server";

interface Workout {
    id: number;
    user_id: string;
    name: string;
    muscles: string[];
    equipment: string[];
    duration: number;
    difficulty: string;
    exercises: unknown;
    estimated_calories: number;
    created_at: string;
    completed_at: string | null;
}

// Initialize database on first request
let dbInitialized = false;
async function ensureDbInitialized() {
    if (!dbInitialized) {
        await initializeDatabase();
        dbInitialized = true;
    }
}

// GET - Fetch user's workouts
export async function GET() {
    try {
        await ensureDbInitialized();

        const user = await stackServerApp.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const workouts = await query<Workout>(
            `SELECT * FROM workouts WHERE user_id = $1 ORDER BY created_at DESC`,
            [user.id]
        );

        return NextResponse.json({ success: true, workouts });
    } catch (error) {
        console.error("Error fetching workouts:", error);
        return NextResponse.json(
            { error: "Failed to fetch workouts" },
            { status: 500 }
        );
    }
}

// POST - Save a new workout
export async function POST(request: NextRequest) {
    try {
        await ensureDbInitialized();

        const user = await stackServerApp.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const body = await request.json();
        const { name, muscles, equipment, duration, difficulty, exercises, estimatedCalories } = body;

        // Validate required fields
        if (!name || !muscles || !equipment || !duration || !difficulty || !exercises) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        // Check for duplicate workout name
        const existingWorkout = await queryOne<Workout>(
            `SELECT id FROM workouts WHERE user_id = $1 AND name = $2`,
            [user.id, name]
        );

        if (existingWorkout) {
            return NextResponse.json(
                { error: "A workout with this name already exists" },
                { status: 409 }
            );
        }

        const workout = await queryOne<Workout>(
            `INSERT INTO workouts (user_id, name, muscles, equipment, duration, difficulty, exercises, estimated_calories)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
            [user.id, name, muscles, equipment, duration, difficulty, JSON.stringify(exercises), estimatedCalories || 0]
        );

        return NextResponse.json({ success: true, workout });
    } catch (error) {
        console.error("Error saving workout:", error);
        return NextResponse.json(
            { error: "Failed to save workout" },
            { status: 500 }
        );
    }
}

// DELETE - Delete a workout
export async function DELETE(request: NextRequest) {
    try {
        await ensureDbInitialized();

        const user = await stackServerApp.getUser();
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(request.url);
        const workoutId = searchParams.get("id");

        if (!workoutId) {
            return NextResponse.json(
                { error: "Workout ID is required" },
                { status: 400 }
            );
        }

        // Verify the workout belongs to the user before deleting
        const existing = await queryOne<Workout>(
            `SELECT id FROM workouts WHERE id = $1 AND user_id = $2`,
            [workoutId, user.id]
        );

        if (!existing) {
            return NextResponse.json(
                { error: "Workout not found or unauthorized" },
                { status: 404 }
            );
        }

        await query(`DELETE FROM workouts WHERE id = $1`, [workoutId]);

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Error deleting workout:", error);
        return NextResponse.json(
            { error: "Failed to delete workout" },
            { status: 500 }
        );
    }
}
