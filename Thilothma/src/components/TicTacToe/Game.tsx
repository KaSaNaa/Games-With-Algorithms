import React, { useState } from "react";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import { Board } from "./Board";
import { createEmptyBoard, getGameResult, getAvailableMoves } from "../../logic/ticTacToe/gameLogic";
import { minimaxMove } from "../../logic/ticTacToe/minimax";
import { mctsMove } from "../../logic/ticTacToe/mcts";
import { Timer } from "../../utils/timer";
import { saveGameResult, loadGameResults } from "../../utils/storage";

type GameProps = {
  algorithm: "minimax" | "mcts";
};

export const Game: React.FC<GameProps> = ({ algorithm }) => {
  const [board, setBoard] = useState(createEmptyBoard());
  const [xIsNext, setXIsNext] = useState(true);
  const [moveTimes, setMoveTimes] = useState<number[]>([]);

  const result = getGameResult(board);

  const handleCellClick = (row: number, col: number) => {
    if (board[row][col] || result.winner || result.draw) return;
    const newBoard = board.map((r, i) => (i === row ? [...r] : r.slice()));
    newBoard[row][col] = "X";
    setBoard(newBoard);
    setXIsNext(false);

    setTimeout(() => {
      if (!getGameResult(newBoard).winner && !getGameResult(newBoard).draw) {
        try {
          const timer = new Timer();
          timer.start();
          let move;
          if (algorithm === "minimax") {
            move = minimaxMove(newBoard, "O", 2);
          } else {
            move = mctsMove(newBoard, "O", 30);
          }
          const elapsed = timer.stop();
          setMoveTimes(times => [...times, elapsed]);
          if (move && !newBoard[move.row][move.col]) {
            const compBoard = newBoard.map((r, i) => (i === move.row ? [...r] : r.slice()));
            compBoard[move.row][move.col] = "O";
            setBoard(compBoard);
            setXIsNext(true);
          }
        } catch (e) {
          // Exception handling
          alert("An error occurred during computer move.");
        }
      }
    }, 300);
  };

  const handleRestart = () => {
    setBoard(createEmptyBoard());
    setXIsNext(true);
    setMoveTimes([]);
  };

  const handleDownloadResults = () => {
    const results = loadGameResults();
    const blob = new Blob([JSON.stringify(results, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tic-tac-toe-results.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Save result when game ends
  React.useEffect(() => {
    if ((result.winner || result.draw) && moveTimes.length > 0) {
      try {
        // Get player name from global or localStorage
        const playerName =
          (typeof window !== "undefined" && (window as any).playerName) ||
          localStorage.getItem("playerName") ||
          "Anonymous";
        saveGameResult({
          playerName,
          algorithm,
          result: result.winner === "X" ? "Win" : result.winner === "O" ? "Lose" : "Draw",
          moveTimes,
          date: new Date().toISOString().slice(0, 10),
        });
      } catch (e) {
        // Exception handling
        // ...could show a toast or alert
      }
    }
    // eslint-disable-next-line
  }, [result.winner, result.draw]);

  return (
    <div>
      <Typography variant="h6" align="center" sx={{ mb: 2 }}>
        <strong>Turn:</strong> {xIsNext ? "X (You)" : "O (Computer)"}
      </Typography>
      <Board board={board} onCellClick={handleCellClick} />
      {result.winner && (
        <Alert severity={result.winner === "X" ? "success" : "error"} sx={{ mt: 2 }}>
          {result.winner === "X" ? "You Win!" : "Computer Wins!"}
        </Alert>
      )}
      {result.draw && (
        <Alert severity="info" sx={{ mt: 2 }}>
          Draw!
        </Alert>
      )}
      {(result.winner || result.draw) && (
        <Button variant="contained" sx={{ mt: 2, mr: 2 }} onClick={handleRestart}>
          Restart Game
        </Button>
      )}
      <Button variant="outlined" sx={{ mt: 2 }} onClick={handleDownloadResults}>
        Download Results
      </Button>
    </div>
  );
};
