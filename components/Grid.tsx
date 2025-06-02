import React from "react";
import { ALIVE } from "@/lib/grid";
import type { Grid as GridType } from "@/lib/grid";

interface GridProps {
  grid: GridType;
  onCellClick?: (row: number, col: number) => void;
}

export const Grid: React.FC<GridProps> = ({ grid, onCellClick }) => {
  const numRows = grid.length;
  const numCols = grid[0]?.length || 0;

  // Use inline style for dynamic grid size
  return (
    <div
      className="w-full max-w-xs aspect-square mx-auto grid gap-1"
      style={{
        gridTemplateColumns: `repeat(${numCols}, minmax(0, 1fr))`,
        gridTemplateRows: `repeat(${numRows}, minmax(0, 1fr))`,
      }}
    >
      {grid.map((row, rowIdx) =>
        row.map((cellValue, colIdx) => (
          <div
            key={`${rowIdx}-${colIdx}`}
            className={[
              `w-full h-full rounded-sm border border-gray-300 transition-colors duration-200 cursor-pointer`,
              cellValue === ALIVE ? "bg-black" : "bg-white",
              `hover:ring-2 hover:ring-blue-400`,
            ].join(" ")}
            onClick={() => onCellClick?.(rowIdx, colIdx)}
          />
        )),
      )}
    </div>
  );
};
