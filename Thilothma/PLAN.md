### 🔧 **Phase 1: Project Setup**
#### Tools & Dependencies:
- React (with TypeScript)
- MUI (for UI components)
- Jest + React Testing Library (for unit testing)

#### File Structure:
```
src/
├── components/
│   ├── GameBoard.tsx
│   ├── Cell.tsx
│   ├── GameMenu.tsx
│   ├── ResultDialog.tsx
├── hooks/
│   └── useGameLogic.ts
├── utils/
│   ├── algorithms.ts
│   ├── storage.ts
│   └── validators.ts
├── types/
│   └── index.ts
├── tests/
│   ├── GameBoard.test.tsx
│   └── algorithms.test.ts
```

---

### 🧠 **Phase 2: Data Structures**
#### Core Structures:
```ts
type Player = 'X' | 'O' | '';
type Board = Player[][];
type Move = { row: number; col: number };
```

- `Board`: 5x5 array (2D matrix).
- `Move`: Position of move with `row` and `col`.
- Use enums for players: human = 'X', computer = 'O'.
- Add a utility function to generate an empty 5x5 board for initialization and testing.

---

### 🎮 **Phase 3: Game Logic**
Use a custom hook like `useGameLogic`.

#### Responsibilities:
- Maintain game state
- Handle user input
- Trigger computer move
- Determine winner
- Track algorithm timings
- Disable user input while the computer is "thinking" (during its move).
- Ensure exception handling if an algorithm fails or times out.

---

### 🤖 **Phase 4: Algorithms for Computer Move**
#### 1. **Minimax with Alpha-Beta Pruning**:
- Depth-limited to avoid performance issues.
- Evaluation function that scores based on lines of 3/4/5.

#### 2. **Monte Carlo Tree Search (MCTS)**:
- Simulates multiple random playouts from current position.
- Picks move with highest average win rate.

Save time taken for each algorithm using `performance.now()`.
- Store which algorithm was used for each game in the results.

---

### 🗃️ **Phase 5: LocalStorage Usage**
Create a helper utility `storage.ts`:

```ts
const saveGameResult = (name: string, outcome: 'win' | 'lose' | 'draw', algoTimes: { [algo: string]: number[] }, algorithm: string) => {
  const previous = JSON.parse(localStorage.getItem('tictactoe_results') || '[]');
  const newResult = { name, outcome, algoTimes, algorithm, timestamp: new Date().toISOString() };
  localStorage.setItem('tictactoe_results', JSON.stringify([...previous, newResult]));
};
```

Store:
- Player name
- Result (win/loss/draw)
- Algorithm move times
- Algorithm used

---

### 🧑‍💻 **Phase 6: UI Components**
Use **MUI** for the UI.

#### 1. `GameMenu.tsx`:
- Let player enter name
- Option to choose algorithm

#### 2. `GameBoard.tsx`:
- Render 5x5 board
- Handle clicks

#### 3. `Cell.tsx`:
- Reusable cell with `onClick` and player symbol

#### 4. `ResultDialog.tsx`:
- Pop-up showing result (win/loss/draw)
- Option to play again
- Ensure accessibility (a11y) for all interactive components.

---

### ⏱️ **Phase 7: Timing Algorithm Moves**
In `useGameLogic`, wrap each computer move call with:

```ts
const start = performance.now();
const move = runMinimax(board);
const end = performance.now();
const timeTaken = end - start;
```

Store `timeTaken` per algorithm for every round in an array.
- Handle and log exceptions if timing or algorithm execution fails.

---

### ✅ **Phase 8: Validation & Exception Handling**
- Prevent double clicks on a cell
- Validate player name input (min length, non-empty)
- Handle invalid localStorage data using `try-catch`
- Ensure board isn’t updated once game ends
- Add validation for algorithm selection.
- Catch and handle exceptions in algorithm and storage utilities.

---

### 🧪 **Phase 9: Unit Testing**
Use **Jest + React Testing Library**

#### Test Cases:
- ✅ User can make a move
- ✅ Computer makes optimal move
- ✅ Win/loss/draw detection works
- ✅ Algorithms return valid moves
- ✅ localStorage saves data correctly
- ✅ UI updates correctly on result
- ✅ Exception handling in algorithms and storage utilities

Example test:
```ts
test('Minimax should return a valid move', () => {
  const board = generateEmptyBoard();
  const move = minimax(board, 'O');
  expect(move).toHaveProperty('row');
  expect(move).toHaveProperty('col');
});

test('Algorithm throws error on invalid board', () => {
  expect(() => minimax(null as any, 'O')).toThrow();
});
```

---

### 🏁 **Phase 10: Finishing Touches**
- Add loading spinner while computer is "thinking"
- Add difficulty selector (easy = random, medium = minimax, hard = MCTS)
- Responsive design for mobile
- Add a11y labels and keyboard navigation support for all UI elements.

---
