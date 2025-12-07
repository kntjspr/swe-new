import { NextRequest, NextResponse } from "next/server";
import {
    getExercisesForWorkout,
    calculateEstimatedCalories,
    generateWorkoutName,
    type MuscleGroup,
    type Equipment,
    type Difficulty,
} from "@/lib/exercises";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { muscles, duration, equipment, difficulty } = body as {
            muscles: MuscleGroup[];
            duration: number;
            equipment: Equipment[];
            difficulty: Difficulty;
        };

        // Validate input
        if (!muscles || muscles.length === 0) {
            return NextResponse.json(
                { error: "At least one muscle group must be selected" },
                { status: 400 }
            );
        }

        if (!duration || duration < 15 || duration > 90) {
            return NextResponse.json(
                { error: "Duration must be between 15 and 90 minutes" },
                { status: 400 }
            );
        }

        if (!equipment || equipment.length === 0) {
            return NextResponse.json(
                { error: "At least one equipment type must be selected" },
                { status: 400 }
            );
        }

        const validDifficulties: Difficulty[] = ["beginner", "intermediate", "advanced"];
        if (!difficulty || !validDifficulties.includes(difficulty)) {
            return NextResponse.json(
                { error: "Invalid difficulty level" },
                { status: 400 }
            );
        }

        // Generate workout
        const exercises = getExercisesForWorkout(muscles, equipment, difficulty, duration);
        const estimatedCalories = calculateEstimatedCalories(exercises);
        const suggestedName = generateWorkoutName(muscles);

        // Calculate total workout time
        const totalMinutes = exercises.reduce((total, exercise) => {
            // Estimate time per exercise: (sets * (time per set + rest))
            const timePerSet = 1; // ~1 minute per set
            return total + exercise.sets * (timePerSet + exercise.restSeconds / 60);
        }, 0);

        return NextResponse.json({
            success: true,
            workout: {
                suggestedName,
                muscles,
                equipment,
                duration,
                difficulty,
                exercises,
                estimatedCalories,
                estimatedMinutes: Math.round(totalMinutes),
            },
        });
    } catch (error) {
        console.error("Error generating workout:", error);
        return NextResponse.json(
            { error: "Failed to generate workout" },
            { status: 500 }
        );
    }
}
