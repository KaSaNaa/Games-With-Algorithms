export interface Position {
  x: number;
  y: number;
}

export interface MoveHistory {
  from: Position;
  to: Position;
  moveNumber: number;
}

export interface PlayerResult {
  name: string;
  moves: string[];
  date: string;
}

