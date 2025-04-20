# 🧠 Eight Queens Puzzle Solver

A **React-based application** to solve the classic *Eight Queens Puzzle*, where players place 8 queens on a chessboard such that no two queens threaten each other. The app tracks solutions, scores, and execution time.
---
## 🔥 Features
- 🧩 **Interactive Chessboard**: Click to place queens dynamically.
- ✅ **Solution Validation**: Checks for conflicts and duplicate solutions.
- ⏱️ **Performance Metrics**: Tracks time taken and calculates scores.
- 💾 **Persistence**: Saves solutions to `localStorage`.
- 🛠️ **Error Handling**: Graceful fallback UI via ErrorBoundary.
---
## 📸 Screenshots & Code Snippets
### 1. 📊 Player Dashboard
Displays:
- Total possible solutions (92).
- Found solutions with player name, time, score, and queen positions.
![Dashboard](screenshots/dashboard.png)
---
### 2. ♟️ Core Logic – Queen Placement Validation
```javascript
const isQueenHere = (row, col) => queens.some((q) => q.row === row && q.col === col);
const isAttacked = (row, col) => {
  return queens.some((q) => 
    q.row === row || 
    q.col === col || 
    Math.abs(q.row - row) === Math.abs(q.col - col)
  );
};
```
- `isQueenHere`: Checks if a queen exists at (row, col).
- `isAttacked`: Validates threats (same row, column, or diagonal).
#### 🧠 Solution Submission
```javascript
const handleClick = (row, col) => {
  if (!submittedName || isQueenHere(row, col) || isAttacked(row, col)) return;
  // ... submits solution if 8 queens are placed safely.
};
```
![Validation](screenshots/validation.png)
---
### 3. 🧮 Backend Solver – Recursive Backtracking Algorithm
```javascript
function solveEightQueens() {
  function solve(col, rows, diag1, diag2) {
    if (col == 8) {
      count++;
      return;
    }
    for (let row = 0; row < 8; row++) {
      const d1 = row - col;
      const d2 = row + col;
      if (!(rows & (1 << row)) && 
          !(diag1 & (1 << d1)) && 
          !(diag2 & (1 << d2))) {
        solve(col + 1, rows | (1 << row), diag1 | (1 << d1), diag2 | (1 << d2));
      }
    }
  }
  solve(0, 0, 0, 0);
  return count; // Output: 92
}
```
✅ Uses **bitmasking** for efficient conflict detection.
![Backend Solver](screenshots/backend.png)
---
### 4. 💽 Data Persistence – localStorage Management
```javascript
export const saveSolution = (playerName, queens, duration, score) => {
  const allSolutions = JSON.parse(localStorage.getItem("eightQueensSolutions")) || [];
  // Prevents duplicate submissions from different players.
  if (sameSolution && sameSolution.playerName !== playerName) {
    return { 
      success: false, 
      message: `This solution was already used by ${sameSolution.playerName}.` 
    };
  }
  // Saves new solution.
  allSolutions.push({ playerName, queens, duration, score, time: new Date().toISOString() });
  localStorage.setItem("eightQueensSolutions", JSON.stringify(allSolutions));
};
```
---
### 5. ❗ Error Handling – React Error Boundary
```javascript
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return <h2>Something went wrong. Please refresh the page.</h2>;
    }
    return this.props.children;
  }
}
```
🔐 Catches UI errors and displays a fallback message.
---
## ⚙️ How to Run
1. **Clone the repository:**
```bash
git clone <repo-url>
```
2. **Install dependencies:**
```bash
npm install
```
3. **Start the app:**
```bash
npm start
```
---
## 🧾 License
[MIT](LICENSE)
---
> Made with 💡 and ♟️ by [DeenathD]
