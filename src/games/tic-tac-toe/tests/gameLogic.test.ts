import {
  createEmptyBoard,
  getAvailableMoves,
  checkWinner,
  isDraw,
  getGameResult,
} from "../logic/ticTacToe/gameLogic";
import { Board } from "../logic/ticTacToe/types";

describe("TicTacToe gameLogic", () => {
  it("should create an empty 5x5 board", () => {
    const board = createEmptyBoard();
    expect(board.length).toBe(5);
    expect(board.every(row => row.length === 5)).toBe(true);
    expect(board.flat().every(cell => cell === "")).toBe(true);
  });

  it("should return all available moves for an empty board", () => {
    const board = createEmptyBoard();
    const moves = getAvailableMoves(board);
    expect(moves.length).toBe(25);
  });

  it("should detect a row winner", () => {
    const board: Board = [
      ["X", "X", "X", "X", "X"],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ];
    expect(checkWinner(board)).toBe("X");
  });

  it("should detect a column winner", () => {
    const board: Board = [
      ["O", "", "", "", ""],
      ["O", "", "", "", ""],
      ["O", "", "", "", ""],
      ["O", "", "", "", ""],
      ["O", "", "", "", ""],
    ];
    expect(checkWinner(board)).toBe("O");
  });

  it("should detect a diagonal winner", () => {
    const board: Board = [
      ["X", "", "", "", ""],
      ["", "X", "", "", ""],
      ["", "", "X", "", ""],
      ["", "", "", "X", ""],
      ["", "", "", "", "X"],
    ];
    expect(checkWinner(board)).toBe("X");
  });

  it("should detect anti-diagonal winner", () => {
    const board: Board = [
      ["", "", "", "", "O"],
      ["", "", "", "O", ""],
      ["", "", "O", "", ""],
      ["", "O", "", "", ""],
      ["O", "", "", "", ""],
    ];
    expect(checkWinner(board)).toBe("O");
  });

  it("should detect a draw", () => {
    // Fill the board with no winner
    const board: Board = Array.from({ length: 5 }, (_, r) =>
      Array.from({ length: 5 }, (_, c) => ((r + c) % 2 === 0 ? "X" : "O"))
    );
    expect(isDraw(board)).toBe(true);
    expect(getGameResult(board)).toEqual({ winner: null, draw: true });
  });

  it("should return correct game result for winner", () => {
    const board: Board = [
      ["X", "X", "X", "X", "X"],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ];
    expect(getGameResult(board)).toEqual({ winner: "X", draw: false });
  });

  it("should return correct game result for ongoing game", () => {
    const board: Board = createEmptyBoard();
    board[0][0] = "X";
    expect(getGameResult(board)).toEqual({ winner: null, draw: false });
  });
});
