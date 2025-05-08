import type { Board, Player, Move, GameResult, Cell } from "./types";

export function createEmptyBoard(): Board {
  return Array.from({ length: 5 }, () => Array<Cell>(5).fill(""));
}

export function getAvailableMoves(board: Board): Move[] {
  const moves: Move[] = [];
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 5; c++) {
      if (!board[r][c]) moves.push({ row: r, col: c });
    }
  }
  return moves;
}

export function checkWinner(board: Board): Player | null {
  // Rows
  for (let r = 0; r < 5; r++) {
    if (
      board[r][0] &&
      board[r].every(cell => cell === board[r][0])
    ) return board[r][0] as Player;
  }
  // Columns
  for (let c = 0; c < 5; c++) {
    const col = [0,1,2,3,4].map(r => board[r][c]);
    if (col[0] && col.every(cell => cell === col[0])) return col[0] as Player;
  }
  // Diagonals
  const diag1 = [0,1,2,3,4].map(i => board[i][i]);
  if (diag1[0] && diag1.every(cell => cell === diag1[0])) return diag1[0] as Player;
  const diag2 = [0,1,2,3,4].map(i => board[i][4-i]);
  if (diag2[0] && diag2.every(cell => cell === diag2[0])) return diag2[0] as Player;
  return null;
}

export function isDraw(board: Board): boolean {
  return getAvailableMoves(board).length === 0 && !checkWinner(board);
}

export function getGameResult(board: Board): GameResult {
  const winner = checkWinner(board);
  return {
    winner,
    draw: !winner && isDraw(board),
  };
}
