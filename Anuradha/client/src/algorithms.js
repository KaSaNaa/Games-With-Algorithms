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

// 3-Peg Iterative (Non-Recursive) Algorithm - Fixed version
export function hanoiIterative(n, source, auxiliary, destination) {
    if (n === 1) return [`${source}->${destination}`];
    let moves = [];
    let totalMoves = Math.pow(2, n) - 1;
    // initialize the pegs with disks on the source peg
    let pegs = {};
    pegs[source] = Array.from({ length: n }, (_, i) => n - i);
    pegs[auxiliary] = [];
    pegs[destination] = [];

    // For even number of disks, swap auxiliary and destination
    if (n % 2 === 0) {
        [auxiliary, destination] = [destination, auxiliary];
    }
    // Use pegNames: first is source, second is destination, third is auxiliary
    const pegNames = [source, destination, auxiliary];

    const moveDisk = (from, to) => {
        const disk = pegs[from].pop();
        pegs[to].push(disk);
        moves.push(`${from}->${to}`);
    };

    for (let i = 1; i <= totalMoves; i++) {
        const [p1, p2, p3] = pegNames;
        if (i % 3 === 1) {
            if ((pegs[p1].slice(-1)[0] || Infinity) < (pegs[p2].slice(-1)[0] || Infinity)) {
                moveDisk(p1, p2);
            } else {
                moveDisk(p2, p1);
            }
        } else if (i % 3 === 2) {
            if ((pegs[p1].slice(-1)[0] || Infinity) < (pegs[p3].slice(-1)[0] || Infinity)) {
                moveDisk(p1, p3);
            } else {
                moveDisk(p3, p1);
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
export function frameStewart(n, source = 'A', spare1 = 'B', spare2 = 'C', destination = 'D') {
    // Allow passing peg names as an array
    if (Array.isArray(source)) {
        [source, spare1, spare2, destination] = source;
    }
    // Base cases
    if (n === 0) return [];
    if (n === 1) return [`${source}->${destination}`];

    // Choose k (a heuristic; here we use k = n - floor(sqrt(2*n)))
    const k = n - Math.floor(Math.sqrt(2 * n));

    // Step 1: move top k disks from source to spare1 (using destination and spare2 as auxiliaries)
    const moves1 = frameStewart(k, source, destination, spare2, spare1);
    // Step 2: move remaining n-k disks from source to destination using a classic 3-peg solution
    const moves2 = hanoiRecursive(n - k, source, spare2, destination);
    // Step 3: move the k disks from spare1 to destination (using source and spare2 as auxiliaries)
    const moves3 = frameStewart(k, spare1, source, spare2, destination);

    return [...moves1, ...moves2, ...moves3];
}