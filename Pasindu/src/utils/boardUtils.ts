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

export function isKnightMove(from: string, to: string): boolean {
  const files = 'abcdefgh';
  const fromX = 8 - parseInt(from[1]);
  const fromY = files.indexOf(from[0]);
  const toX = 8 - parseInt(to[1]);
  const toY = files.indexOf(to[0]);
  const dx = Math.abs(fromX - toX);
  const dy = Math.abs(fromY - toY);
  return (dx === 2 && dy === 1) || (dx === 1 && dy === 2);
}