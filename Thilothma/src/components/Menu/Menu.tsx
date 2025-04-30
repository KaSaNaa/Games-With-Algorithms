import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { TextField } from "@mui/material";

declare global {
  interface Window {
    playerName?: string;
  }
}

type MenuProps = {
  onSelectGame: (game: string, algo?: "minimax" | "mcts") => void;
};

export const Menu: React.FC<MenuProps> = ({ onSelectGame }) => {
  const [algorithm, setAlgorithm] = useState<"minimax" | "mcts">("minimax");
  const [name, setName] = useState<string>("");

  // Store name globally and in localStorage
  const handleStartGame = () => {
    if (name.trim()) {
      window.playerName = name;
      localStorage.setItem("playerName", name);
      onSelectGame("tic-tac-toe", algorithm);
    }
  };

  useEffect(() => {
    // Load name from localStorage if available
    const stored = localStorage.getItem("playerName");
    if (stored) {
      setName(stored);
      window.playerName = stored;
    }
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={4}>
      <Typography variant="h5" gutterBottom>
        Select a Game
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
        <Typography variant="subtitle1" gutterBottom>
          Tic-Tac-Toe Algorithm:
        </Typography>
        <ToggleButtonGroup
          value={algorithm}
          exclusive
          onChange={(_, value) => value && setAlgorithm(value)}
          aria-label="algorithm"
          sx={{ mb: 2 }}
        >
          <ToggleButton value="minimax" aria-label="minimax">
            Minimax
          </ToggleButton>
          <ToggleButton value="mcts" aria-label="mcts">
            MCTS
          </ToggleButton>
        </ToggleButtonGroup>
        <TextField
          label="Enter your name"
          type="text"
          variant="outlined"
          size="small"
          placeholder="John Doe"
          sx={{ width: 200, mb: 2 }}
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Box>
      <Button
        variant="contained"
        size="large"
        onClick={handleStartGame}
        disabled={!name.trim()}
      >
        Tic-Tac-Toe 5x5
      </Button>
      {/* Add more games here as needed */}
    </Box>
  );
};
