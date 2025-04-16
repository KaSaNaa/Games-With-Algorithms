// client/src/algorithms.js

// 3-Peg Recursive Algorithm
export function hanoiRecursive(n, source, auxiliary, destination) {
    let moves = [];
    function solve(n, s, a, d) {
        if (n === 1) {
            moves.push(`${s}->${d}`);
            return;
        }
        solve(n - 1, s, d, a);
        moves.push(`${s}->${d}`);
        solve(n - 1, a, s, d);
    }
    solve(n, source, auxiliary, destination);
    return moves;
}

// 3-Peg Iterative (Non-Recursive) Algorithm
export function hanoiIterative(n, source, auxiliary, destination) {
    if (n === 1) return [`${source}->${destination}`];
    let moves = [];
    let totalMoves = Math.pow(2, n) - 1;
    let pegs = {};
    pegs[source] = Array.from({ length: n }, (_, i) => n - i);
    pegs[auxiliary] = [];
    pegs[destination] = [];

    const swap = (n % 2 === 0) ? [auxiliary, destination] : [destination, auxiliary];
    const pegNames = [source, swap[0], swap[1]];

    const moveDisk = (from, to) => {
        const disk = pegs[from].pop();
        pegs[to].push(disk);
        moves.push(`${from}->${to}`);
    };

    for (let i = 1; i <= totalMoves; i++) {
        const [p1, p2, p3] = pegNames;
        if (i % 3 === 1) {
            if ((pegs[p1].slice(-1)[0] || Infinity) < (pegs[p3].slice(-1)[0] || Infinity)) {
                moveDisk(p1, p3);
            } else {
                moveDisk(p3, p1);
            }
        } else if (i % 3 === 2) {
            if ((pegs[p1].slice(-1)[0] || Infinity) < (pegs[p2].slice(-1)[0] || Infinity)) {
                moveDisk(p1, p2);
            } else {
                moveDisk(p2, p1);
            }
        } else {
            if ((pegs[p2].slice(-1)[0] || Infinity) < (pegs[p3].slice(-1)[0] || Infinity)) {
                moveDisk(p2, p3);
            } else {
                moveDisk(p3, p2);
            }
        }
    }
    return moves;
}

// 4-Peg Frame-Stewart Algorithm (Simplified)
export function frameStewart(n, pegs) {
    let moves = [];
    if (n === 0) return moves;
    if (n === 1) {
        moves.push(`${pegs[0]}->${pegs[pegs.length - 1]}`);
        return moves;
    }
    const k = n - Math.round(Math.sqrt(2 * n + 1)) + 1;
    moves = moves.concat(frameStewart(k, [pegs[0], ...pegs.slice(2), pegs[1]]));
    moves = moves.concat(hanoiRecursive(n - k, pegs[0], pegs[1], pegs[pegs.length - 1]));
    moves = moves.concat(frameStewart(k, [pegs[1], pegs[0], ...pegs.slice(2)]));
    return moves;
}
