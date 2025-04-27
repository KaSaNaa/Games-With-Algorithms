# 🧩 Full Plan for Tic-Tac-Toe 5x5 (Human vs Computer)

---

## 🏗️ 1. Tech Stack

| Layer | Choice | Why |
|------|------|-----|
| Frontend | React + TypeScript | Easy UI + TS typing for clean logic |
| Database | Browser `localStorage` | Simple, no backend required |
| Styling | MUI Material (or clean CSS) | Quick, pretty, flexible |
| Testing | Vitest + Testing Library (or React Testing Library) | Easy unit testing and UI testing |
| Game Logic | TypeScript Classes + Functions | Clean code separation |

---

## 🎯 2. Game Features to Implement

| Feature | Details |
|---------|---------|
| 5x5 Tic-Tac-Toe Grid | Not 3x3 — bigger, more complex |
| Human vs Computer | Human plays `X`, Computer plays `O` |
| UI for Win/Loss/Draw | Popup/modal after game over |
| Timer for Computer Move | Record time taken per move for each algorithm |
| Save Game Result | Save player name, result, move timings into localStorage |
| Validate Inputs | Cannot click filled cell, no double move |
| Unit Testing | Game logic, win check, computer move generation |

---

## 🧠 3. Algorithms for Computer Optimal Move

You need **two different algorithm approaches** for the computer move.

We'll use:

| Algorithm | Why |
|-----------|-----|
| 1. **Minimax Algorithm** (with depth limit) | Classic unbeatable AI |
| 2. **Monte Carlo Tree Search (MCTS)** | Probabilistic decision-making, more randomness |

### 📚 Data Structures we'll use

- **2D Array** → 5x5 game board  
- **Tree structures** → For MCTS move simulations  
- **State Objects** → For Minimax + Game simulation  
- **Queue (optional)** → If you build BFS expansions in MCTS

---

## 🛠️ 4. UI Structure

### Pages/Components:

- **Menu Page** → Select Game (Tic-Tac-Toe, Knight's Tour, etc.)
- **Tic-Tac-Toe Game Page**
  - 5x5 Grid
  - Turn Indicator
  - Timer for computer move
  - Endgame Modal (Win/Lose/Draw)
  - Save Name Input Modal
- **Leaderboard Page** (Optional Bonus)

---

## 💾 5. LocalStorage Structure

```json
{
  "ticTacToeGameResults": [
    {
      "playerName": "Alice",
      "algorithm": "Minimax",
      "result": "Win",
      "moveTimes": [0.2, 0.4, 0.1, ...],
      "date": "2025-04-27"
    },
    {
      "playerName": "Bob",
      "algorithm": "MCTS",
      "result": "Lose",
      "moveTimes": [0.7, 0.3, 0.5, ...],
      "date": "2025-04-27"
    }
  ]
}
```

---

## 🧪 6. Unit Tests to Cover

- Correct move generation for Minimax
- Correct move generation for MCTS
- Board state validation (win/loss/draw)
- Computer takes valid moves only
- Timer records correctly
- UI shows proper modal at end

---

## 🔥 7. Challenges to Prepare For

| Challenge | Preparation |
|-----------|-------------|
| 5x5 grid is **much bigger** than 3x3 | Depth-limit Minimax to avoid long wait times |
| MCTS needs **tuning** | Decide number of simulations/time budget |
| UI can feel **slow** if move generation is heavy | Optimize with async/yield tricks if needed |
| Win conditions are **harder to check** | Create efficient 5-in-a-row check horizontally, vertically, diagonally |

---

# 🚀 Phasewise Build Plan

| Phase | Tasks |
|-------|-------|
| Phase 1 | Build the basic 5x5 board and player move logic |
| Phase 2 | Implement simple random computer player |
| Phase 3 | Implement Minimax AI (depth limited) |
| Phase 4 | Implement MCTS AI |
| Phase 5 | Add game timers and save results to localStorage |
| Phase 6 | Add UI for Win/Loss/Draw and Player Name |
| Phase 7 | Write unit tests |
| Phase 8 | Polish UI with animations |

---

# ✅ Final Deliverables List

- Game menu with Tic-Tac-Toe option
- 5x5 human vs computer gameplay
- Two AI strategies (Minimax + MCTS)
- Save name + result + move times into `localStorage`
- Unit tests for logic
- Validations (no invalid moves, no cheating)
- Exception Handling
- UI for game status (Win/Lose/Draw)

---

# ✨ In Short
We are building **a proper polished web game**, React-style.  
Locally stored.  
Cleanly divided logic.  
With two **serious AI strategies**.

---

Would you like me to now draw the **folder structure** and **component tree** next?  
It'll make your build even faster 🚀  
(You’re moving like a real dev now.)  
Want me to continue? 🔥