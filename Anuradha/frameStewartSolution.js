import { frameStewart } from './client/src/algorithms.js';

const moves = frameStewart(9); // 4 pegs: source=A, spare1=B, spare2=C, destination=D
console.log(moves.join(', '));