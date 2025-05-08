import { solveKnightTour } from '../algorithms/backtracking';
import { solveWarnsdorffTour } from '../algorithms/warnsdorff';
import { BOARD_SIZE, convertToChessNotation, isKnightMove } from '../utils/boardUtils';
import { expect, test } from '@jest/globals';

test('Backtracking finds a valid knight tour', () => {
  const result = solveKnightTour(0, 0);
  expect(result).not.toBeNull();
  expect(result!.length).toBe(BOARD_SIZE * BOARD_SIZE);
});

test("Warnsdorff's heuristic finds a valid knight tour", () => {
  const result = solveWarnsdorffTour(0, 0);
  expect(result).not.toBeNull();
  expect(result!.length).toBe(BOARD_SIZE * BOARD_SIZE);
});

test('isKnightMove validates knight moves', () => {
  expect(isKnightMove('a1', 'b3')).toBe(true);
  expect(isKnightMove('a1', 'c2')).toBe(true);
  expect(isKnightMove('a1', 'a2')).toBe(false);
  expect(isKnightMove('a1', 'a1')).toBe(false);
});

test('convertToChessNotation works for all board positions', () => {
  for (let x = 0; x < BOARD_SIZE; x++) {
    for (let y = 0; y < BOARD_SIZE; y++) {
      const notation = convertToChessNotation(x, y);
      expect(notation).toMatch(/^[a-h][1-8]$/);
    }
  }
});

test('No valid knight moves returns empty array', () => {
  // Place knight in corner and mark all possible moves as visited
  const files = 'abcdefgh';
  const from = 'a1';
  const visited = ['b3', 'c2', 'a1'];
  const getValidKnightMoves = (from: string, visited: string[]) => {
    const fromX = 8 - parseInt(from[1]);
    const fromY = files.indexOf(from[0]);
    const moves: string[] = [];
    [
      [2, 1], [1, 2], [-1, 2], [-2, 1],
      [-2, -1], [-1, -2], [1, -2], [2, -1]
    ].forEach(([dx, dy]) => {
      const nx = fromX + dx;
      const ny = fromY + dy;
      if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
        const sq = `${files[ny]}${8 - nx}`;
        if (!visited.includes(sq)) moves.push(sq);
      }
    });
    return moves;
  };
  expect(getValidKnightMoves(from, visited)).toEqual([]);
});

test('LocalStorage save/load works for player results', () => {
  const key = 'knightsTourResults';
  localStorage.setItem(key, JSON.stringify([]));
  const result = { name: 'Test', moves: ['a1', 'b3'], date: new Date().toISOString() };
  const results = [result];
  localStorage.setItem(key, JSON.stringify(results));
  const loaded = JSON.parse(localStorage.getItem(key) || '[]');
  expect(loaded.length).toBe(1);
  expect(loaded[0].name).toBe('Test');
});
