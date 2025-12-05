"use client";

import { useCallback, useEffect, useRef } from "react";
import MuscleSvg from "./MuscleSvg";

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

interface MuscleSelectorProps {
  selectedMuscles: Set<MuscleGroup>;
  onSelectionChange: (muscles: Set<MuscleGroup>) => void;
}

export default function MuscleSelector({
  selectedMuscles,
  onSelectionChange,
}: MuscleSelectorProps) {
  const svgRef = useRef<HTMLDivElement>(null);

  const toggleMuscle = useCallback(
    (muscleName: MuscleGroup) => {
      const newSelection = new Set(selectedMuscles);
      if (newSelection.has(muscleName)) {
        newSelection.delete(muscleName);
      } else {
        newSelection.add(muscleName);
      }
      onSelectionChange(newSelection);
    },
    [selectedMuscles, onSelectionChange]
  );

  // Handle click events on SVG paths
  useEffect(() => {
    const container = svgRef.current;
    if (!container) return;

    const handleClick = (e: Event) => {
      const target = e.target as SVGElement;
      const muscleGroup = target.getAttribute("data-elem") as MuscleGroup;
      if (muscleGroup) {
        toggleMuscle(muscleGroup);
      }
    };

    container.addEventListener("click", handleClick);
    return () => container.removeEventListener("click", handleClick);
  }, [toggleMuscle]);

  // Update SVG styles based on selection
  useEffect(() => {
    const container = svgRef.current;
    if (!container) return;

    const paths = container.querySelectorAll("[data-elem]");
    paths.forEach((path) => {
      const muscleGroup = path.getAttribute("data-elem") as MuscleGroup;
      if (selectedMuscles.has(muscleGroup)) {
        path.classList.add("active");
      } else {
        path.classList.remove("active");
      }
    });
  }, [selectedMuscles]);

  return (
    <div className="muscle-selector w-full h-full flex items-center justify-center" ref={svgRef}>
      <MuscleSvg />
    </div>
  );
}
