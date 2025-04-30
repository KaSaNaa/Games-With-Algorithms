import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

type BoardProps = {
  board: string[][];
  onCellClick: (row: number, col: number) => void;
};

export const Board: React.FC<BoardProps> = ({ board, onCellClick }) => (
  <Box
    display="grid"
    gridTemplateRows="repeat(5, 48px)"
    gridTemplateColumns="repeat(5, 48px)"
    gap={1}
    justifyContent="center"
    alignItems="center"
    my={2}
  >
    {board.map((row, rIdx) =>
      row.map((cell, cIdx) => (
        <Button
          key={`${rIdx}-${cIdx}`}
          variant="outlined"
          sx={{
            width: 48,
            height: 48,
            fontSize: 24,
            minWidth: 0,
            minHeight: 0,
            p: 0,
            color: cell === "X" ? "primary.main" : cell === "O" ? "secondary.main" : "text.primary",
          }}
          onClick={() => onCellClick(rIdx, cIdx)}
          disabled={!!cell}
        >
          {cell}
        </Button>
      ))
    )}
  </Box>
);
