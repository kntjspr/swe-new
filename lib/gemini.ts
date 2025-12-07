import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

export interface GeneratedExercise {
    name: string;
    sets: number;
    reps: string;
    notes?: string;
}

export interface GeneratedWorkout {
    name: string;
    description: string;
    exercises: GeneratedExercise[];
    estimatedDuration: number;
    difficulty: string;
}

export async function generateWorkoutWithGemini(
    prompt: string
): Promise<GeneratedWorkout | null> {
    if (!genAI) {
        console.warn("GEMINI_API_KEY is not set.");
        return null;
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Clean up markdown code blocks if present
        const cleanText = text.replace(/```json/g, "").replace(/```/g, "").trim();

        return JSON.parse(cleanText) as GeneratedWorkout;
    } catch (error) {
        console.error("Error generating workout with Gemini:", error);
        return null;
    }
}
