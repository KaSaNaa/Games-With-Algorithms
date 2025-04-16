import { Position } from '../types';
import { BOARD_SIZE, knightMoves, isValidMove } from '../utils/boardUtils';

function countOnwardMoves(x: number, y: number, board: number[][]): number {
  let count = 0;
  for (const [dx, dy] of knightMoves) {
    const nx = x + dx;
    const ny = y + dy;
    if (isValidMove(nx, ny, board)) count++;
  }
  return count;
}

export function solveWarnsdorffTour(startX: number, startY: number): Position[] | null {
  const board: number[][] = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(-1));
  const moveSequence: Position[] = [{ x: startX, y: startY }];
  board[startX][startY] = 0;

  let x = startX;
  let y = startY;

  for (let moveCount = 1; moveCount < BOARD_SIZE * BOARD_SIZE; moveCount++) {
    // Generate all valid moves from current position
    const candidates: { x: number; y: number; degree: number }[] = [];
    for (const [dx, dy] of knightMoves) {
      const nx = x + dx;
      const ny = y + dy;
      if (isValidMove(nx, ny, board)) {
        candidates.push({ x: nx, y: ny, degree: countOnwardMoves(nx, ny, board) });
      }
    }
    if (candidates.length === 0) return null; // Dead end
    // Sort by degree (Warnsdorff's rule)
    candidates.sort((a, b) => a.degree - b.degree);
    // Pick the move with the lowest degree
    const next = candidates[0];
    board[next.x][next.y] = moveCount;
    moveSequence.push({ x: next.x, y: next.y });
    x = next.x;
    y = next.y;
  }
  return moveSequence;
}
