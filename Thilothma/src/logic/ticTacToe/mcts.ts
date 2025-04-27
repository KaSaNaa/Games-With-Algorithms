import { Board, Player, Move } from "./types";
import { getAvailableMoves, checkWinner } from "./gameLogic";

export function mctsMove(board: Board, player: Player, simulations = 30): Move {
  const moves = getAvailableMoves(board);
  let bestMove = moves[0];
  let bestWinRate = -1;

  for (const move of moves) {
    let wins = 0;
    for (let i = 0; i < simulations; i++) {
      if (simulateRandomGame(applyMove(board, move, player), switchPlayer(player)) === player) {
        wins++;
      }
    }
    const winRate = wins / simulations;
    if (winRate > bestWinRate) {
      bestWinRate = winRate;
      bestMove = move;
    }
  }
  return bestMove;
}

function simulateRandomGame(board: Board, player: Player): Player | null {
  let currentBoard = board.map(row => [...row]);
  let currentPlayer = player;
  while (true) {
    const winner = checkWinner(currentBoard);
    if (winner) return winner;
    const moves = getAvailableMoves(currentBoard);
    if (moves.length === 0) return null;
    const move = moves[Math.floor(Math.random() * moves.length)];
    currentBoard[move.row][move.col] = currentPlayer;
    currentPlayer = switchPlayer(currentPlayer);
  }
}

function applyMove(board: Board, move: Move, player: Player): Board {
  const newBoard = board.map(row => [...row]);
  newBoard[move.row][move.col] = player;
  return newBoard;
}

function switchPlayer(player: Player): Player {
  return player === "X" ? "O" : "X";
}
