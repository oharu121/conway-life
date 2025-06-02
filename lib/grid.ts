export type GridState = 1 | 0;
export type Grid = GridState[][];

const GRID_LENGTH = 10;
export const ALIVE = 1;
export const DEAD = 0;

// external functions
export function createRandomGrid(): Grid {
  return Array.from({ length: GRID_LENGTH }, createRow);
}

export function getNextGrid(currentGrid: Grid): Grid {
  const nextGrid: Grid = currentGrid.map((row) => [...row]);

  for (let i = 0; i < currentGrid.length; i++) {
    for (let j = 0; j < currentGrid[i].length; j++) {
      const aliveNeighbors = countAliveNeighbors([i, j], currentGrid);
      const currentGridState = currentGrid[i][j];

      let nextGridState: GridState = DEAD;
      switch (aliveNeighbors) {
        //過疎死
        case 0:
        case 1:
          nextGridState = DEAD;
          break;

        //生存
        case 2:
          nextGridState = currentGridState === ALIVE ? ALIVE : DEAD;
          break;

        //生存・誕生
        case 3:
          nextGridState = ALIVE;
          break;

        //過密死（４つ以上）
        default:
          nextGridState = DEAD;
          break;
      }

      nextGrid[i][j] = nextGridState;
    }
  }

  console.log(nextGrid);
  return nextGrid;
}

export function toggleCell(grid: Grid, row: number, col: number): Grid {
  const newGrid = grid.map((row) => [...row]);
  newGrid[row][col] = newGrid[row][col] === ALIVE ? DEAD : ALIVE;
  return newGrid;
}

// internal functions
function createRow(): GridState[] {
  return Array.from({ length: GRID_LENGTH }, createCell);
}

function createCell(): GridState {
  return Math.random() > 0.5 ? ALIVE : DEAD;
}

function countAliveNeighbors(
  position: [number, number],
  currentGrid: Grid,
): number {
  const neighbors: [number, number][] = [
    [-1, 1], // 左上
    [0, 1], // 上
    [1, 1], // 右上
    [1, 0], // 右
    [1, -1], // 右下
    [0, -1], // 下
    [-1, -1], // 左下
    [-1, 0], // 左
  ];

  let aliveNeighbors = 0;

  for (const [offsetX, offsetY] of neighbors) {
    const [x, y] = position;
    const neighborX = x + offsetX;
    const neighborY = y + offsetY;

    if (!isOutsideGrid(neighborX, neighborY)) {
      aliveNeighbors += currentGrid[neighborX][neighborY];
    }
  }

  return aliveNeighbors;
}

function isOutsideGrid(x: number, y: number): boolean {
  return x < 0 || x >= GRID_LENGTH || y < 0 || y >= GRID_LENGTH;
}
