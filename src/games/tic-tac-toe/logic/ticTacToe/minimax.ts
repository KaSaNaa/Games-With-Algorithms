import type { Board, Player, Move } from "./types";
import { getAvailableMoves, checkWinner } from "./gameLogic";

export function minimaxMove(board: Board, player: Player, depth = 2): Move {
  let bestScore = -Infinity;
  let bestMove: Move = { row: 0, col: 0 };
  for (const move of getAvailableMoves(board)) {
    const newBoard = board.map(row => [...row]);
    newBoard[move.row][move.col] = player;
    const score = minimax(newBoard, switchPlayer(player), depth - 1, false);
    if (score > bestScore) {
      bestScore = score;
      bestMove = move;
    }
  }
  return bestMove;
}

function minimax(board: Board, player: Player, depth: number, isMax: boolean): number {
  const winner = checkWinner(board);
  if (winner === "O") return 10;
  if (winner === "X") return -10;
  if (depth === 0 || getAvailableMoves(board).length === 0) return 0;

  if (isMax) {
    let maxEval = -Infinity;
    for (const move of getAvailableMoves(board)) {
      const newBoard = board.map(row => [...row]);
      newBoard[move.row][move.col] = player;
      const evalScore = minimax(newBoard, switchPlayer(player), depth - 1, false);
      maxEval = Math.max(maxEval, evalScore);
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of getAvailableMoves(board)) {
      const newBoard = board.map(row => [...row]);
      newBoard[move.row][move.col] = player;
      const evalScore = minimax(newBoard, switchPlayer(player), depth - 1, true);
      minEval = Math.min(minEval, evalScore);
    }
    return minEval;
  }
}

function switchPlayer(player: Player): Player {
  return player === "X" ? "O" : "X";
}
