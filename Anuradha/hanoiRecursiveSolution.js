import { hanoiRecursive } from './client/src/algorithms.js';

const moves = hanoiRecursive(7, 'A', 'B', 'C');
console.log(moves.join(', '));