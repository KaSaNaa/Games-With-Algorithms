import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import styles from "./Home.module.css";  // Import the CSS Module

const TicTacToe = lazy(() => import("./games/tic-tac-toe/App"));
const KnightsTour = lazy(() => import("./games/knights-tour/App"));
const EightQueens = lazy(() => import("./games/eight-queens/App.jsx"));
const TowerOfHanoi = lazy(() => import("./games/tower-of-hanoi/App.jsx"));
const TSP = lazy(() => import("./games/traveling-salesman/App"));

function Home() {
  return (
    <div className={styles.homeContainer}>
      <h1 className={styles.homeTitle}>Game Portal</h1>
      <ul className={styles.homeList}>
        <li>
          <Link to="/tic-tac-toe" className={styles.homeLink}>
            Tic Tac Toe
          </Link>
        </li>
        <li>
          <Link to="/knights-tour" className={styles.homeLink}>
            Knight's Tour
          </Link>
        </li>
        <li>
          <Link to="/eight-queens" className={styles.homeLink}>
            Eight Queens Puzzle
          </Link>
        </li>
        <li>
          <Link to="/tower-of-hanoi" className={styles.homeLink}>
            Tower of Hanoi
          </Link>
        </li>
        <li>
          <Link to="/tsp" className={styles.homeLink}>
            Traveling Salesman Problem
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tic-tac-toe" element={<TicTacToe />} />
          <Route path="/knights-tour" element={<KnightsTour />} />
          <Route path="/eight-queens" element={<EightQueens />} />
          <Route path="/tower-of-hanoi/*" element={<TowerOfHanoi />} />
          <Route path="/tsp" element={<TSP />} />
        </Routes>
      </Suspense>
    </Router>
  );
}