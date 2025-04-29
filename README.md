# PDSA-2-CW

A multi-game React project demonstrating classic algorithmic puzzles and AI strategies, built for PDSA-2 coursework.

## Project Overview

This repository contains interactive web implementations of four classic algorithmic games, each showcasing different data structures and algorithms. All games feature a modern UI, localStorage-based leaderboards, and unit-tested logic.

### Games & Algorithms

- **Tic-Tac-Toe (5x5, Human vs Computer)**
  - **Algorithms:** Minimax (depth-limited), Monte Carlo Tree Search (MCTS)
  - **Features:** Two AI strategies, move timing, win/loss/draw UI, leaderboard, unit tests

- **Knight’s Tour**
  - **Algorithms:** Backtracking, Warnsdorff’s Heuristic
  - **Features:** Interactive chessboard, solver visualizer, leaderboard, unit tests

- **8 Queens Puzzle**
  - **Algorithms:** Bitmasking & Backtracking (runs in a Web Worker)
  - **Features:** Place queens interactively, solution uniqueness check, leaderboard, unit tests

- **Traveling Salesman Problem (TSP)**
  - **Algorithms:** Brute Force (≤7 cities), Nearest Neighbor, Genetic Algorithm
  - **Features:** SVG map, city selection, algorithm comparison, exportable results, leaderboard, unit tests

- **Towers of Hanoi**
  - **Algorithms:** 3-Peg Recursive, 3-Peg Iterative, 4-Peg Frame-Stewart (recursive)
  - **Features:** Interactive drag-and-drop UI, multiple algorithm visualizations, leaderboard, unit tests

## Tech Stack

- **Frontend:** React, TypeScript, Vite, Material UI/CSS
- **State & Storage:** React state, localStorage
- **Testing:** Jest/Vitest + Testing Library
- **Backend (optional):** Node.js/Express for result submission (Tower of Hanoi)

## Key Features

- Modern, responsive UI for each puzzle/game
- Multiple algorithmic approaches per game
- Local leaderboard and result export
- Robust input validation and error handling
- Comprehensive unit test coverage

## How to Run

1. Clone the repo and install dependencies in each game folder.
2. Start each app with `npm run dev` (or `yarn dev`).
3. Open in your browser and play!

---

*Built for educational purposes to demonstrate practical applications of algorithms and data structures in interactive games.*
