import { hanoiRecursive } from './client/src/algorithms.js';

const moves = hanoiRecursive(5, 'A', 'B', 'C');
console.log(moves.join(', '));