export type MuscleGroup =
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

export type Equipment = "Bodyweight" | "Dumbbells" | "Barbell" | "Cable";
export type Difficulty = "beginner" | "intermediate" | "advanced";

export interface Exercise {
    id: string;
    name: string;
    muscles: MuscleGroup[];
    equipment: Equipment[];
    difficulty: Difficulty;
    sets: number;
    reps: string; // e.g., "8-12" or "30 sec"
    restSeconds: number;
    tip: string;
    caloriesPerSet: number;
}

// Comprehensive exercise library
export const exerciseLibrary: Exercise[] = [
    // CHEST
    {
        id: "push-ups",
        name: "Push-Ups",
        muscles: ["CHEST", "TRICEPS", "SHOULDERS"],
        equipment: ["Bodyweight"],
        difficulty: "beginner",
        sets: 3,
        reps: "12-15",
        restSeconds: 60,
        tip: "Keep your core tight and body in a straight line.",
        caloriesPerSet: 8,
    },
    {
        id: "dumbbell-bench-press",
        name: "Dumbbell Bench Press",
        muscles: ["CHEST", "TRICEPS"],
        equipment: ["Dumbbells"],
        difficulty: "beginner",
        sets: 4,
        reps: "8-12",
        restSeconds: 90,
        tip: "Lower the weights slowly for better muscle activation.",
        caloriesPerSet: 12,
    },
    {
        id: "barbell-bench-press",
        name: "Barbell Bench Press",
        muscles: ["CHEST", "TRICEPS", "SHOULDERS"],
        equipment: ["Barbell"],
        difficulty: "intermediate",
        sets: 4,
        reps: "6-10",
        restSeconds: 120,
        tip: "Plant your feet firmly and arch your upper back slightly.",
        caloriesPerSet: 15,
    },
    {
        id: "incline-dumbbell-press",
        name: "Incline Dumbbell Press",
        muscles: ["CHEST", "SHOULDERS"],
        equipment: ["Dumbbells"],
        difficulty: "intermediate",
        sets: 3,
        reps: "8-12",
        restSeconds: 90,
        tip: "Set the bench at 30-45 degrees for upper chest emphasis.",
        caloriesPerSet: 11,
    },
    {
        id: "cable-flyes",
        name: "Cable Chest Flyes",
        muscles: ["CHEST"],
        equipment: ["Cable"],
        difficulty: "intermediate",
        sets: 3,
        reps: "12-15",
        restSeconds: 60,
        tip: "Focus on squeezing your chest at the peak contraction.",
        caloriesPerSet: 9,
    },
    {
        id: "diamond-push-ups",
        name: "Diamond Push-Ups",
        muscles: ["CHEST", "TRICEPS"],
        equipment: ["Bodyweight"],
        difficulty: "intermediate",
        sets: 3,
        reps: "10-12",
        restSeconds: 60,
        tip: "Form a diamond shape with your hands under your chest.",
        caloriesPerSet: 10,
    },

    // BACK
    {
        id: "pull-ups",
        name: "Pull-Ups",
        muscles: ["BACK", "BICEPS"],
        equipment: ["Bodyweight"],
        difficulty: "intermediate",
        sets: 4,
        reps: "6-10",
        restSeconds: 120,
        tip: "Pull your chest towards the bar, not just your chin.",
        caloriesPerSet: 12,
    },
    {
        id: "dumbbell-rows",
        name: "Dumbbell Rows",
        muscles: ["BACK", "BICEPS"],
        equipment: ["Dumbbells"],
        difficulty: "beginner",
        sets: 3,
        reps: "10-12",
        restSeconds: 90,
        tip: "Keep your back flat and pull elbow towards your hip.",
        caloriesPerSet: 10,
    },
    {
        id: "barbell-rows",
        name: "Barbell Bent-Over Rows",
        muscles: ["BACK", "BICEPS", "TRAPS"],
        equipment: ["Barbell"],
        difficulty: "intermediate",
        sets: 4,
        reps: "8-10",
        restSeconds: 90,
        tip: "Maintain a 45-degree hip hinge throughout the movement.",
        caloriesPerSet: 13,
    },
    {
        id: "lat-pulldowns",
        name: "Lat Pulldowns",
        muscles: ["BACK", "BICEPS"],
        equipment: ["Cable"],
        difficulty: "beginner",
        sets: 3,
        reps: "10-12",
        restSeconds: 90,
        tip: "Pull the bar to your upper chest while leaning slightly back.",
        caloriesPerSet: 9,
    },
    {
        id: "cable-rows",
        name: "Seated Cable Rows",
        muscles: ["BACK", "BICEPS"],
        equipment: ["Cable"],
        difficulty: "beginner",
        sets: 3,
        reps: "10-12",
        restSeconds: 90,
        tip: "Squeeze your shoulder blades together at the end of each rep.",
        caloriesPerSet: 10,
    },
    {
        id: "deadlifts",
        name: "Deadlifts",
        muscles: ["BACK", "HAMSTRINGS", "GLUTES", "TRAPS"],
        equipment: ["Barbell"],
        difficulty: "advanced",
        sets: 4,
        reps: "5-8",
        restSeconds: 180,
        tip: "Drive through your heels and keep the bar close to your body.",
        caloriesPerSet: 20,
    },

    // SHOULDERS
    {
        id: "overhead-press",
        name: "Overhead Press",
        muscles: ["SHOULDERS", "TRICEPS"],
        equipment: ["Barbell"],
        difficulty: "intermediate",
        sets: 4,
        reps: "6-10",
        restSeconds: 120,
        tip: "Engage your core and avoid arching your lower back.",
        caloriesPerSet: 12,
    },
    {
        id: "dumbbell-shoulder-press",
        name: "Dumbbell Shoulder Press",
        muscles: ["SHOULDERS", "TRICEPS"],
        equipment: ["Dumbbells"],
        difficulty: "beginner",
        sets: 3,
        reps: "8-12",
        restSeconds: 90,
        tip: "Press straight up and control the negative portion.",
        caloriesPerSet: 11,
    },
    {
        id: "lateral-raises",
        name: "Lateral Raises",
        muscles: ["SHOULDERS"],
        equipment: ["Dumbbells"],
        difficulty: "beginner",
        sets: 3,
        reps: "12-15",
        restSeconds: 60,
        tip: "Lead with your elbows, not your hands.",
        caloriesPerSet: 7,
    },
    {
        id: "front-raises",
        name: "Front Raises",
        muscles: ["SHOULDERS"],
        equipment: ["Dumbbells"],
        difficulty: "beginner",
        sets: 3,
        reps: "12-15",
        restSeconds: 60,
        tip: "Raise to shoulder height only, no higher.",
        caloriesPerSet: 6,
    },
    {
        id: "face-pulls",
        name: "Face Pulls",
        muscles: ["SHOULDERS", "TRAPS"],
        equipment: ["Cable"],
        difficulty: "beginner",
        sets: 3,
        reps: "15-20",
        restSeconds: 60,
        tip: "Pull towards your forehead with elbows high.",
        caloriesPerSet: 6,
    },
    {
        id: "pike-push-ups",
        name: "Pike Push-Ups",
        muscles: ["SHOULDERS", "TRICEPS"],
        equipment: ["Bodyweight"],
        difficulty: "intermediate",
        sets: 3,
        reps: "8-12",
        restSeconds: 90,
        tip: "Form an inverted V and lower your head towards the floor.",
        caloriesPerSet: 9,
    },

    // BICEPS
    {
        id: "bicep-curls",
        name: "Dumbbell Bicep Curls",
        muscles: ["BICEPS"],
        equipment: ["Dumbbells"],
        difficulty: "beginner",
        sets: 3,
        reps: "10-12",
        restSeconds: 60,
        tip: "Keep elbows pinned to your sides throughout the movement.",
        caloriesPerSet: 6,
    },
    {
        id: "hammer-curls",
        name: "Hammer Curls",
        muscles: ["BICEPS", "FOREARMS"],
        equipment: ["Dumbbells"],
        difficulty: "beginner",
        sets: 3,
        reps: "10-12",
        restSeconds: 60,
        tip: "Keep palms facing each other throughout the curl.",
        caloriesPerSet: 6,
    },
    {
        id: "barbell-curls",
        name: "Barbell Curls",
        muscles: ["BICEPS"],
        equipment: ["Barbell"],
        difficulty: "beginner",
        sets: 3,
        reps: "8-12",
        restSeconds: 90,
        tip: "Avoid swinging; use strict form for maximum bicep activation.",
        caloriesPerSet: 8,
    },
    {
        id: "cable-curls",
        name: "Cable Curls",
        muscles: ["BICEPS"],
        equipment: ["Cable"],
        difficulty: "beginner",
        sets: 3,
        reps: "12-15",
        restSeconds: 60,
        tip: "Constant tension from the cable makes this great for a pump.",
        caloriesPerSet: 7,
    },
    {
        id: "chin-ups",
        name: "Chin-Ups",
        muscles: ["BICEPS", "BACK"],
        equipment: ["Bodyweight"],
        difficulty: "intermediate",
        sets: 3,
        reps: "6-10",
        restSeconds: 120,
        tip: "Use an underhand grip and focus on pulling with biceps.",
        caloriesPerSet: 11,
    },

    // TRICEPS
    {
        id: "tricep-dips",
        name: "Tricep Dips",
        muscles: ["TRICEPS", "CHEST"],
        equipment: ["Bodyweight"],
        difficulty: "intermediate",
        sets: 3,
        reps: "10-12",
        restSeconds: 90,
        tip: "Keep elbows close to your body and lower to 90 degrees.",
        caloriesPerSet: 10,
    },
    {
        id: "skull-crushers",
        name: "Skull Crushers",
        muscles: ["TRICEPS"],
        equipment: ["Barbell"],
        difficulty: "intermediate",
        sets: 3,
        reps: "10-12",
        restSeconds: 90,
        tip: "Lower the bar to your forehead with control.",
        caloriesPerSet: 9,
    },
    {
        id: "tricep-pushdowns",
        name: "Tricep Pushdowns",
        muscles: ["TRICEPS"],
        equipment: ["Cable"],
        difficulty: "beginner",
        sets: 3,
        reps: "12-15",
        restSeconds: 60,
        tip: "Keep elbows stationary; only forearms should move.",
        caloriesPerSet: 7,
    },
    {
        id: "overhead-tricep-extension",
        name: "Overhead Tricep Extension",
        muscles: ["TRICEPS"],
        equipment: ["Dumbbells"],
        difficulty: "beginner",
        sets: 3,
        reps: "10-12",
        restSeconds: 60,
        tip: "Keep elbows pointed forward and close to your head.",
        caloriesPerSet: 7,
    },
    {
        id: "close-grip-bench",
        name: "Close-Grip Bench Press",
        muscles: ["TRICEPS", "CHEST"],
        equipment: ["Barbell"],
        difficulty: "intermediate",
        sets: 4,
        reps: "8-10",
        restSeconds: 90,
        tip: "Grip shoulder-width apart and keep elbows tucked.",
        caloriesPerSet: 12,
    },

    // QUADRICEPS
    {
        id: "squats",
        name: "Barbell Squats",
        muscles: ["QUADRICEPS", "GLUTES", "HAMSTRINGS"],
        equipment: ["Barbell"],
        difficulty: "intermediate",
        sets: 4,
        reps: "8-10",
        restSeconds: 120,
        tip: "Keep chest up and knees tracking over toes.",
        caloriesPerSet: 18,
    },
    {
        id: "goblet-squats",
        name: "Goblet Squats",
        muscles: ["QUADRICEPS", "GLUTES"],
        equipment: ["Dumbbells"],
        difficulty: "beginner",
        sets: 3,
        reps: "10-12",
        restSeconds: 90,
        tip: "Hold dumbbell at chest level and squat between your legs.",
        caloriesPerSet: 12,
    },
    {
        id: "bodyweight-squats",
        name: "Bodyweight Squats",
        muscles: ["QUADRICEPS", "GLUTES"],
        equipment: ["Bodyweight"],
        difficulty: "beginner",
        sets: 3,
        reps: "15-20",
        restSeconds: 60,
        tip: "Push knees out and keep weight in your heels.",
        caloriesPerSet: 8,
    },
    {
        id: "lunges",
        name: "Walking Lunges",
        muscles: ["QUADRICEPS", "GLUTES", "HAMSTRINGS"],
        equipment: ["Bodyweight"],
        difficulty: "beginner",
        sets: 3,
        reps: "12 each leg",
        restSeconds: 60,
        tip: "Take long strides and keep your torso upright.",
        caloriesPerSet: 10,
    },
    {
        id: "dumbbell-lunges",
        name: "Dumbbell Lunges",
        muscles: ["QUADRICEPS", "GLUTES"],
        equipment: ["Dumbbells"],
        difficulty: "intermediate",
        sets: 3,
        reps: "10 each leg",
        restSeconds: 90,
        tip: "Hold dumbbells at your sides and step forward with control.",
        caloriesPerSet: 12,
    },
    {
        id: "leg-press",
        name: "Leg Press",
        muscles: ["QUADRICEPS", "GLUTES"],
        equipment: ["Cable"],
        difficulty: "beginner",
        sets: 4,
        reps: "10-12",
        restSeconds: 90,
        tip: "Don't lock your knees at the top of the movement.",
        caloriesPerSet: 14,
    },

    // HAMSTRINGS
    {
        id: "romanian-deadlift",
        name: "Romanian Deadlift",
        muscles: ["HAMSTRINGS", "GLUTES", "BACK"],
        equipment: ["Barbell"],
        difficulty: "intermediate",
        sets: 4,
        reps: "8-10",
        restSeconds: 90,
        tip: "Push hips back while keeping legs nearly straight.",
        caloriesPerSet: 14,
    },
    {
        id: "dumbbell-rdl",
        name: "Dumbbell Romanian Deadlift",
        muscles: ["HAMSTRINGS", "GLUTES"],
        equipment: ["Dumbbells"],
        difficulty: "beginner",
        sets: 3,
        reps: "10-12",
        restSeconds: 90,
        tip: "Feel the stretch in your hamstrings at the bottom.",
        caloriesPerSet: 11,
    },
    {
        id: "leg-curls",
        name: "Lying Leg Curls",
        muscles: ["HAMSTRINGS"],
        equipment: ["Cable"],
        difficulty: "beginner",
        sets: 3,
        reps: "12-15",
        restSeconds: 60,
        tip: "Squeeze at the top and lower with control.",
        caloriesPerSet: 8,
    },
    {
        id: "glute-ham-raise",
        name: "Nordic Curls",
        muscles: ["HAMSTRINGS"],
        equipment: ["Bodyweight"],
        difficulty: "advanced",
        sets: 3,
        reps: "5-8",
        restSeconds: 120,
        tip: "Control your descent as much as possible.",
        caloriesPerSet: 10,
    },

    // GLUTES
    {
        id: "hip-thrusts",
        name: "Barbell Hip Thrusts",
        muscles: ["GLUTES", "HAMSTRINGS"],
        equipment: ["Barbell"],
        difficulty: "intermediate",
        sets: 4,
        reps: "10-12",
        restSeconds: 90,
        tip: "Squeeze glutes hard at the top of each rep.",
        caloriesPerSet: 14,
    },
    {
        id: "glute-bridges",
        name: "Glute Bridges",
        muscles: ["GLUTES"],
        equipment: ["Bodyweight"],
        difficulty: "beginner",
        sets: 3,
        reps: "15-20",
        restSeconds: 60,
        tip: "Drive through your heels and squeeze at the top.",
        caloriesPerSet: 7,
    },
    {
        id: "dumbbell-hip-thrusts",
        name: "Dumbbell Hip Thrusts",
        muscles: ["GLUTES"],
        equipment: ["Dumbbells"],
        difficulty: "beginner",
        sets: 3,
        reps: "12-15",
        restSeconds: 60,
        tip: "Place dumbbell on hips and thrust upward.",
        caloriesPerSet: 10,
    },
    {
        id: "cable-kickbacks",
        name: "Cable Kickbacks",
        muscles: ["GLUTES"],
        equipment: ["Cable"],
        difficulty: "beginner",
        sets: 3,
        reps: "12-15 each leg",
        restSeconds: 60,
        tip: "Keep your core tight and avoid swinging.",
        caloriesPerSet: 7,
    },

    // CALVES
    {
        id: "calf-raises",
        name: "Standing Calf Raises",
        muscles: ["CALVES"],
        equipment: ["Bodyweight"],
        difficulty: "beginner",
        sets: 4,
        reps: "15-20",
        restSeconds: 45,
        tip: "Rise up on your toes as high as possible.",
        caloriesPerSet: 5,
    },
    {
        id: "dumbbell-calf-raises",
        name: "Dumbbell Calf Raises",
        muscles: ["CALVES"],
        equipment: ["Dumbbells"],
        difficulty: "beginner",
        sets: 4,
        reps: "12-15",
        restSeconds: 45,
        tip: "Hold dumbbells for added resistance.",
        caloriesPerSet: 6,
    },
    {
        id: "seated-calf-raises",
        name: "Seated Calf Raises",
        muscles: ["CALVES"],
        equipment: ["Dumbbells"],
        difficulty: "beginner",
        sets: 3,
        reps: "15-20",
        restSeconds: 45,
        tip: "Sit with weight on thighs for soleus emphasis.",
        caloriesPerSet: 5,
    },

    // ABDOMINALS
    {
        id: "crunches",
        name: "Crunches",
        muscles: ["ABDOMINALS"],
        equipment: ["Bodyweight"],
        difficulty: "beginner",
        sets: 3,
        reps: "15-20",
        restSeconds: 45,
        tip: "Lift shoulders off ground, don't pull on your neck.",
        caloriesPerSet: 5,
    },
    {
        id: "planks",
        name: "Plank Hold",
        muscles: ["ABDOMINALS", "OBLIQUES"],
        equipment: ["Bodyweight"],
        difficulty: "beginner",
        sets: 3,
        reps: "30-60 sec",
        restSeconds: 60,
        tip: "Keep body in straight line from head to heels.",
        caloriesPerSet: 6,
    },
    {
        id: "leg-raises",
        name: "Hanging Leg Raises",
        muscles: ["ABDOMINALS"],
        equipment: ["Bodyweight"],
        difficulty: "intermediate",
        sets: 3,
        reps: "10-15",
        restSeconds: 60,
        tip: "Raise legs with control, avoid swinging.",
        caloriesPerSet: 8,
    },
    {
        id: "cable-crunches",
        name: "Cable Crunches",
        muscles: ["ABDOMINALS"],
        equipment: ["Cable"],
        difficulty: "intermediate",
        sets: 3,
        reps: "12-15",
        restSeconds: 60,
        tip: "Crunch down and squeeze your abs hard.",
        caloriesPerSet: 7,
    },
    {
        id: "mountain-climbers",
        name: "Mountain Climbers",
        muscles: ["ABDOMINALS", "QUADRICEPS"],
        equipment: ["Bodyweight"],
        difficulty: "beginner",
        sets: 3,
        reps: "30 sec",
        restSeconds: 45,
        tip: "Keep hips low and move quickly.",
        caloriesPerSet: 10,
    },

    // OBLIQUES
    {
        id: "russian-twists",
        name: "Russian Twists",
        muscles: ["OBLIQUES", "ABDOMINALS"],
        equipment: ["Bodyweight"],
        difficulty: "beginner",
        sets: 3,
        reps: "20 total",
        restSeconds: 45,
        tip: "Rotate from your core, not just your arms.",
        caloriesPerSet: 6,
    },
    {
        id: "side-planks",
        name: "Side Plank Hold",
        muscles: ["OBLIQUES"],
        equipment: ["Bodyweight"],
        difficulty: "beginner",
        sets: 3,
        reps: "30 sec each side",
        restSeconds: 45,
        tip: "Stack feet and keep hips elevated.",
        caloriesPerSet: 5,
    },
    {
        id: "woodchops",
        name: "Cable Woodchops",
        muscles: ["OBLIQUES", "ABDOMINALS"],
        equipment: ["Cable"],
        difficulty: "intermediate",
        sets: 3,
        reps: "12 each side",
        restSeconds: 60,
        tip: "Rotate through your core with control.",
        caloriesPerSet: 8,
    },
    {
        id: "bicycle-crunches",
        name: "Bicycle Crunches",
        muscles: ["OBLIQUES", "ABDOMINALS"],
        equipment: ["Bodyweight"],
        difficulty: "beginner",
        sets: 3,
        reps: "20 total",
        restSeconds: 45,
        tip: "Touch elbow to opposite knee with each rep.",
        caloriesPerSet: 7,
    },

    // TRAPS
    {
        id: "shrugs",
        name: "Dumbbell Shrugs",
        muscles: ["TRAPS"],
        equipment: ["Dumbbells"],
        difficulty: "beginner",
        sets: 3,
        reps: "12-15",
        restSeconds: 60,
        tip: "Shrug straight up, hold at top, lower slowly.",
        caloriesPerSet: 6,
    },
    {
        id: "barbell-shrugs",
        name: "Barbell Shrugs",
        muscles: ["TRAPS"],
        equipment: ["Barbell"],
        difficulty: "beginner",
        sets: 4,
        reps: "10-12",
        restSeconds: 60,
        tip: "Keep arms straight and shrug shoulders to ears.",
        caloriesPerSet: 8,
    },

    // FOREARMS
    {
        id: "wrist-curls",
        name: "Wrist Curls",
        muscles: ["FOREARMS"],
        equipment: ["Dumbbells"],
        difficulty: "beginner",
        sets: 3,
        reps: "15-20",
        restSeconds: 45,
        tip: "Rest forearms on thighs and curl wrists up.",
        caloriesPerSet: 4,
    },
    {
        id: "reverse-wrist-curls",
        name: "Reverse Wrist Curls",
        muscles: ["FOREARMS"],
        equipment: ["Dumbbells"],
        difficulty: "beginner",
        sets: 3,
        reps: "15-20",
        restSeconds: 45,
        tip: "Palm down, curl wrists upward.",
        caloriesPerSet: 4,
    },
    {
        id: "farmers-walk",
        name: "Farmer's Walk",
        muscles: ["FOREARMS", "TRAPS"],
        equipment: ["Dumbbells"],
        difficulty: "beginner",
        sets: 3,
        reps: "40 steps",
        restSeconds: 60,
        tip: "Walk with heavy dumbbells, keep shoulders back.",
        caloriesPerSet: 12,
    },
];

// Get exercises filtered by criteria
export function getExercisesForWorkout(
    muscles: MuscleGroup[],
    equipment: Equipment[],
    difficulty: Difficulty,
    targetDuration: number
): Exercise[] {
    // Filter exercises that match the criteria
    const matchingExercises = exerciseLibrary.filter((exercise) => {
        // Must target at least one selected muscle
        const targetsMuscle = exercise.muscles.some((m) => muscles.includes(m));
        // Must use available equipment
        const hasEquipment = exercise.equipment.some((e) => equipment.includes(e));
        // Difficulty should match or be easier
        const difficultyMatch = getDifficultyLevel(exercise.difficulty) <= getDifficultyLevel(difficulty);

        return targetsMuscle && hasEquipment && difficultyMatch;
    });

    // Calculate how many exercises we need based on duration
    // Assume ~5-7 minutes per exercise including rest
    const avgTimePerExercise = 6;
    const targetExerciseCount = Math.max(3, Math.floor(targetDuration / avgTimePerExercise));

    // Prioritize exercises that hit multiple selected muscles
    const sorted = matchingExercises.sort((a, b) => {
        const aHits = a.muscles.filter((m) => muscles.includes(m)).length;
        const bHits = b.muscles.filter((m) => muscles.includes(m)).length;
        return bHits - aHits;
    });

    // Select exercises, ensuring variety
    const selected: Exercise[] = [];
    const usedExerciseIds = new Set<string>();

    // First, try to get at least one exercise per muscle group
    for (const muscle of muscles) {
        const muscleExercise = sorted.find(
            (e) => e.muscles.includes(muscle) && !usedExerciseIds.has(e.id)
        );
        if (muscleExercise && selected.length < targetExerciseCount) {
            selected.push(muscleExercise);
            usedExerciseIds.add(muscleExercise.id);
        }
    }

    // Fill remaining slots
    for (const exercise of sorted) {
        if (selected.length >= targetExerciseCount) break;
        if (!usedExerciseIds.has(exercise.id)) {
            selected.push(exercise);
            usedExerciseIds.add(exercise.id);
        }
    }

    // Adjust sets based on difficulty and duration
    return selected.map((exercise) => {
        let setsMultiplier = 1;
        if (difficulty === "advanced") setsMultiplier = 1.25;
        if (difficulty === "beginner") setsMultiplier = 0.75;

        return {
            ...exercise,
            sets: Math.max(2, Math.round(exercise.sets * setsMultiplier)),
        };
    });
}

function getDifficultyLevel(difficulty: Difficulty): number {
    switch (difficulty) {
        case "beginner":
            return 1;
        case "intermediate":
            return 2;
        case "advanced":
            return 3;
    }
}

// Calculate estimated calories for a workout
export function calculateEstimatedCalories(exercises: Exercise[]): number {
    return exercises.reduce((total, exercise) => {
        return total + exercise.caloriesPerSet * exercise.sets;
    }, 0);
}

// Generate workout name based on muscles
export function generateWorkoutName(muscles: MuscleGroup[]): string {
    if (muscles.length === 0) return "Custom Workout";

    const upperBodyMuscles: MuscleGroup[] = ["CHEST", "BACK", "SHOULDERS", "BICEPS", "TRICEPS", "FOREARMS", "TRAPS"];
    const lowerBodyMuscles: MuscleGroup[] = ["QUADRICEPS", "HAMSTRINGS", "GLUTES", "CALVES"];
    const coreMuscles: MuscleGroup[] = ["ABDOMINALS", "OBLIQUES"];

    const hasUpper = muscles.some((m) => upperBodyMuscles.includes(m));
    const hasLower = muscles.some((m) => lowerBodyMuscles.includes(m));
    const hasCore = muscles.some((m) => coreMuscles.includes(m));

    if (hasUpper && hasLower && hasCore) return "Full Body Blast";
    if (hasUpper && hasLower) return "Total Body Workout";
    if (hasUpper && hasCore) return "Upper Body & Core";
    if (hasLower && hasCore) return "Lower Body & Core";

    if (hasUpper) {
        if (muscles.includes("CHEST") && muscles.includes("TRICEPS")) return "Push Day Power";
        if (muscles.includes("BACK") && muscles.includes("BICEPS")) return "Pull Day Power";
        if (muscles.includes("SHOULDERS")) return "Shoulder Sculptor";
        return "Upper Body Strength";
    }

    if (hasLower) {
        if (muscles.includes("GLUTES")) return "Glute Builder";
        return "Leg Day Destroyer";
    }

    if (hasCore) return "Core Crusher";

    return "Custom Workout";
}
