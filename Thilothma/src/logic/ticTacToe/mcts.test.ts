import { mctsMove } from "./mcts";
import { Board } from "./types";

describe("mctsMove", () => {
  it("should pick a winning move if available", () => {
    const board: Board = [
      ["O", "O", "O", "O", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ];
    const move = mctsMove(board, "O", 10);
    expect(move).toEqual({ row: 0, col: 4 });
  });

  it("should block opponent's win", () => {
    const board: Board = [
      ["X", "X", "X", "X", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ];
    const move = mctsMove(board, "O", 10);
    expect(move).toEqual({ row: 0, col: 4 });
  });

  it("should return a valid move on an empty board", () => {
    const board: Board = Array.from({ length: 5 }, () => Array(5).fill(""));
    const move = mctsMove(board, "O", 5);
    expect(move.row).toBeGreaterThanOrEqual(0);
    expect(move.row).toBeLessThan(5);
    expect(move.col).toBeGreaterThanOrEqual(0);
    expect(move.col).toBeLessThan(5);
  });
});
