"use client";

import { Grid } from "@/components/Grid";
import { useGameOfLife } from "@/hooks/useGameOfLife";

export default function Home() {
  const {
    grid,
    generation,
    controls,
    history,
    cell,
  } = useGameOfLife();

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8 p-4">
      <h1 className="text-3xl font-bold mb-2">Conway&apos;s Game of Life</h1>
      <div className="text-lg mb-2">
        Generation: <span className="font-mono">{generation}</span>
      </div>
      <Grid grid={grid} onCellClick={cell.toggle} />
      <div className="flex gap-4 mt-4">
        <button
          className="px-6 py-2 rounded-md border border-gray-300 bg-white text-black hover:bg-gray-100 transition-colors shadow-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={history.previous}
          disabled={!history.previousGrid}
        >
          Previous
        </button>
        <button
          className="px-6 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition-colors shadow-sm font-medium"
          onClick={controls.next}
        >
          Next
        </button>
        <button
          className="px-6 py-2 rounded-md border border-gray-300 bg-white text-black hover:bg-gray-100 transition-colors shadow-sm font-medium"
          onClick={controls.reset}
        >
          Reset
        </button>
      </div>
      <button
        className={`mt-2 px-6 py-2 rounded-md font-medium transition-colors shadow-sm border border-gray-300 ${controls.isRunning ? "bg-red-500 text-white hover:bg-red-600" : "bg-green-500 text-white hover:bg-green-600"}`}
        onClick={controls.playToggle}
      >
        {controls.isRunning ? "Stop" : "Play"}
      </button>
    </main>
  );
}
