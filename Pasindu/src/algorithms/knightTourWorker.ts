// This file will be bundled as a Web Worker

import { BOARD_SIZE, knightMoves } from '../utils/boardUtils';

self.onmessage = function (e) {
  const { startX, startY } = e.data;
  const result = solveKnightTour(startX, startY);
  // Send result back to main thread
  self.postMessage(result);
};

function solveKnightTour(startX: number, startY: number) {
  const board: number[][] = Array.from(
    { length: BOARD_SIZE },
    () => Array(BOARD_SIZE).fill(-1)
  );
  const moveSequence: { x: number; y: number }[] = [{ x: startX, y: startY }];
  board[startX][startY] = 0;

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
  moveSequence: { x: number; y: number }[]
): boolean {
  if (moveCount === BOARD_SIZE * BOARD_SIZE) return true;

  for (const [dx, dy] of knightMoves) {
    const nextX = x + dx;
    const nextY = y + dy;

    if (
      nextX >= 0 &&
      nextY >= 0 &&
      nextX < BOARD_SIZE &&
      nextY < BOARD_SIZE &&
      board[nextX][nextY] === -1
    ) {
      board[nextX][nextY] = moveCount;
      moveSequence.push({ x: nextX, y: nextY });

      if (solveKnightTourUtil(nextX, nextY, moveCount + 1, board, moveSequence)) {
        return true;
      }

      board[nextX][nextY] = -1;
      moveSequence.pop();
    }
  }
  return false;
}
