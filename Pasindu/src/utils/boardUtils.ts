export const BOARD_SIZE = 8;

export const knightMoves: [number, number][] = [
  [2, 1], [1, 2], [-1, 2], [-2, 1],
  [-2, -1], [-1, -2], [1, -2], [2, -1]
];

export function isValidMove(x: number, y: number, board: number[][]): boolean {
  return x >= 0 && y >= 0 && x < BOARD_SIZE && y < BOARD_SIZE && board[x][y] === -1;
}

export function convertToChessNotation(x: number, y: number): string {
  const files = 'abcdefgh';
  return `${files[y]}${8 - x}`;
}