import { useState, useRef, useEffect, useCallback } from "react";
import { createRandomGrid, getNextGrid, toggleCell } from "@/lib/grid";
import type { Grid } from "@/lib/grid";

const PLAY_INTERVAL = 400; // ms

interface GameOfLifeControls {
  next: () => void;
  reset: () => void;
  playToggle: () => void;
  isRunning: boolean;
}

interface GameOfLifeHistory {
  previousGrid: Grid | null;
  previous: () => void;
}

interface GameOfLifeCell {
  toggle: (row: number, col: number) => void;
}

export function useGameOfLife() {
  const [grid, setGrid] = useState<Grid>(createRandomGrid());
  const [generation, setGeneration] = useState<number>(0);
  const [previousGrid, setPreviousGrid] = useState<Grid | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleNextGeneration = useCallback(() => {
    setPreviousGrid(grid.map((row) => [...row])); // Deep copy
    setGrid((prev) => getNextGrid(prev));
    setGeneration((g) => g + 1);
  }, [grid]);

  const handleReset = useCallback(() => {
    setGrid(createRandomGrid());
    setGeneration(0);
    setPreviousGrid(null);
    setIsRunning(false);
  }, []);

  const handleToggleCell = useCallback((row: number, col: number) => {
    setGrid((prev) => toggleCell(prev, row, col));
  }, []);

  const handlePrevious = useCallback(() => {
    if (previousGrid) {
      setGrid(previousGrid.map((row) => [...row]));
      setGeneration((prev) => (prev > 0 ? prev - 1 : 0));
      setPreviousGrid(null); // Only allow one step back
    }
  }, [previousGrid]);

  const handlePlayToggle = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        handleNextGeneration();
      }, PLAY_INTERVAL);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isRunning, handleNextGeneration]);

  return {
    grid,
    generation,
    controls: {
      next: handleNextGeneration,
      reset: handleReset,
      playToggle: handlePlayToggle,
      isRunning,
    } as GameOfLifeControls,
    history: {
      previousGrid,
      previous: handlePrevious,
    } as GameOfLifeHistory,
    cell: {
      toggle: handleToggleCell,
    } as GameOfLifeCell,
  };
}
