// // eightQueensWorker.js

// function solveEightQueens(board = [], row = 0) {
//     const N = 8; // Board size (8x8)
  
//     if (row === N) {
//       // A solution is found, return 1
//       return 1;
//     }
  
//     let totalSolutions = 0;
//     for (let col = 0; col < N; col++) {
//         const safe = board.every(
//           (q) =>
//             q.row !== row &&
//             q.col !== col &&
//             Math.abs(q.row - row) !== Math.abs(q.col - col)
//         );

//         if (safe) {
//             // Pass a new copy of the board
//             const newBoard = [...board, { row, col }];
//             totalSolutions += solveEightQueens(newBoard, row + 1);
//           }
//         }
  
//     return totalSolutions;
//   }
  
//   onmessage = function (e) {
//     console.log('Worker started with:', e.data);
//     const solutions = solveEightQueens([]);
//     postMessage(solutions); // Send the result back to the main thread
//     console.log(solutions);
//   };
  

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
self.onmessage = function(e) {
    const result = solveEightQueens();
    postMessage(result);
};

// console.log(solveEightQueens()); // Output: 92
