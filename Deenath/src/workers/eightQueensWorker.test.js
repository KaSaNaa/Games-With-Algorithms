// Test for the Eight Queens solver logic
import queen from "../workers/eightQueensWorker.js";
function solveEightQueens() {
    let count = 0;
    function solve(col, rows, diag1, diag2) {
        if (col === 8) {
            count++;
            return;
        }
        for (let row = 0; row < 8; row++) {
            const d1 = row - col;
            const d2 = row + col;
            if (!(rows & (1 << row)) &&
                !(diag1 & (1 << d1)) &&
                !(diag2 & (1 << d2))) {
                solve(col + 1,
                      rows | (1 << row),
                      diag1 | (1 << d1),
                      diag2 | (1 << d2));
            }
        }
    }
    solve(0, 0, 0, 0);
    return count;
}

test('solveEightQueens returns 92 solutions', () => {
    expect(solveEightQueens()).toBe(92);
});
