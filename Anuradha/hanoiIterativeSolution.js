import { hanoiIterative } from './client/src/algorithms.js';

const moves = hanoiIterative(8, 'A', 'B', 'C');
console.log(moves.join(', '));