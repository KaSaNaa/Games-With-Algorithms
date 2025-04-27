import React, { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

type MenuProps = {
  onSelectGame: (game: string, algo?: "minimax" | "mcts") => void;
};

export const Menu: React.FC<MenuProps> = ({ onSelectGame }) => {
  const [algorithm, setAlgorithm] = useState<"minimax" | "mcts">("minimax");

  return (
    <Box display="flex" flexDirection="column" alignItems="center" gap={2} mt={4}>
      <Typography variant="h5" gutterBottom>
        Select a Game
      </Typography>
      <Box>
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
      </Box>
      <Button
        variant="contained"
        size="large"
        onClick={() => onSelectGame("tic-tac-toe", algorithm)}
      >
        Tic-Tac-Toe 5x5
      </Button>
      {/* Add more games here as needed */}
    </Box>
  );
};
