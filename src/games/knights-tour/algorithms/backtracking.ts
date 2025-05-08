import type { Position } from '../types';
import { BOARD_SIZE, knightMoves, isValidMove } from '../utils/boardUtils';

export function solveKnightTour(
  startX: number, 
  startY: number
): Position[] | null {
  const board: number[][] = Array.from(
    { length: BOARD_SIZE }, 
    () => Array(BOARD_SIZE).fill(-1)
  );
  
  const moveSequence: Position[] = [{ x: startX, y: startY }];
  board[startX][startY] = 0; // Mark starting position
  
  if (solveKnightTourUtil(startX, startY, 1, board, moveSequence)) {
    return moveSequence;
  }
  return null;
}

function solveKnightTourUtil(
  x: number, 
  y: number, 
  moveCount: number, 
  board: number[][], 
  moveSequence: Position[]
): boolean {
  if (moveCount === BOARD_SIZE * BOARD_SIZE) return true;

  for (const [dx, dy] of knightMoves) {
    const nextX = x + dx;
    const nextY = y + dy;
    
    if (isValidMove(nextX, nextY, board)) {
      board[nextX][nextY] = moveCount;
      moveSequence.push({ x: nextX, y: nextY });
      
      if (solveKnightTourUtil(nextX, nextY, moveCount + 1, board, moveSequence)) {
        return true;
      }
      
      // Backtrack
      board[nextX][nextY] = -1;
      moveSequence.pop();
    }
  }
  return false;
}