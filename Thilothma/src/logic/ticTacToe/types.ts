export type Player = "X" | "O";
export type Cell = Player | "";
export type Board = Cell[][];
export interface Move {
  row: number;
  col: number;
}
export interface GameResult {
  winner: Player | null;
  draw: boolean;
}
