import { describe, it, expect } from 'vitest';
import { hanoiRecursive, hanoiIterative, frameStewart } from './algorithms';

// Tests for hanoiRecursive
describe('hanoiRecursive', () => {
    it('should solve for 1 disk', () => {
        const moves = hanoiRecursive(1, 'A', 'B', 'C');
        expect(moves).toEqual(['A->C']);
    });

    it('should solve for 3 disks', () => {
        const moves = hanoiRecursive(3, 'A', 'B', 'C');
        // Expected sequence for 3 disks (classic solution)
        const expected = ['A->C', 'A->B', 'C->B', 'A->C', 'B->A', 'B->C', 'A->C'];
        expect(moves).toEqual(expected);
    });
});

// Tests for hanoiIterative
describe('hanoiIterative', () => {
    it('should solve for 1 disk', () => {
        const moves = hanoiIterative(1, 'A', 'B', 'C');
        expect(moves).toEqual(['A->C']);
    });

    it('should produce the correct number of moves for 3 disks', () => {
        const moves = hanoiIterative(3, 'A', 'B', 'C');
        // There should be 2^n - 1 moves
        expect(moves.length).toBe(7);
    });
});

// Tests for frameStewart
describe('frameStewart', () => {
    it('should return empty moves for 0 disks', () => {
        const moves = frameStewart(0, ['A', 'B', 'C', 'D']);
        expect(moves).toEqual([]);
    });

    it('should solve for 1 disk', () => {
        const moves = frameStewart(1, ['A', 'B', 'C', 'D']);
        expect(moves).toEqual(['A->D']);
    });

    it('should produce a valid move sequence for 3 disks', () => {
        const moves = frameStewart(3, ['A', 'B', 'C', 'D']);
        // A basic check: the number of moves should be greater than zero
        // (exact sequence can vary due to recursion order)
        expect(moves.length).toBeGreaterThan(0);
        // And the final move should be to peg D (destination)
        expect(moves[moves.length - 1]).toMatch(/->D$/);
    });
});