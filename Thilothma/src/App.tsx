import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Game } from "./components/TicTacToe/Game";
import { Menu } from "./components/Menu/Menu";

function App() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [algorithm, setAlgorithm] = useState<"minimax" | "mcts" | null>(null);

  const handleSelectGame = (game: string, algo?: "minimax" | "mcts") => {
    setSelectedGame(game);
    if (algo) setAlgorithm(algo);
  };

  const handleBack = () => {
    setSelectedGame(null);
    setAlgorithm(null);
  };

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        PDSA Coursework Games
      </Typography>
      {!selectedGame && (
        <Menu onSelectGame={handleSelectGame} />
      )}
      {selectedGame === "tic-tac-toe" && (
        <>
          <Button onClick={handleBack} sx={{ mb: 2 }}>Back to Menu</Button>
          <Game algorithm={algorithm || "minimax"} />
        </>
      )}
    </Container>
  );
}

export default App
