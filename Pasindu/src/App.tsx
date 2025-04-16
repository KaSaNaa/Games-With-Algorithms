import React, { useState } from 'react';
import ChessboardComponent from './components/ChessBoard';
import { solveKnightTour } from './algorithms/backtracking';
import { solveWarnsdorffTour } from './algorithms/warnsdorff';
import { BOARD_SIZE, convertToChessNotation } from './utils/boardUtils';

const algorithmOptions = [
  { label: 'Backtracking', value: 'backtracking' },
  { label: "Warnsdorff's Heuristic", value: 'warnsdorff' },
];

function App() {
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [algorithm, setAlgorithm] = useState('backtracking');
  const [solution, setSolution] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleStartChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [x, y] = e.target.value.split(',').map(Number);
    setStart({ x, y });
  };

  const handleAlgorithmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlgorithm(e.target.value);
  };

  const handleSolve = () => {
    setError(null);
    let moves = null;
    if (algorithm === 'backtracking') {
      moves = solveKnightTour(start.x, start.y);
    } else {
      moves = solveWarnsdorffTour(start.x, start.y);
    }
    if (!moves) {
      setError('No solution found for this starting position.');
      setSolution([]);
    } else {
      setSolution(moves.map(pos => convertToChessNotation(pos.x, pos.y)));
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: '0 auto', padding: 24 }}>
      <h2>Knight's Tour Visualizer</h2>
      <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
        <label>
          Start Position:
          <select value={`${start.x},${start.y}`} onChange={handleStartChange}>
            {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, idx) => {
              const x = Math.floor(idx / BOARD_SIZE);
              const y = idx % BOARD_SIZE;
              return (
                <option key={idx} value={`${x},${y}`}>{convertToChessNotation(x, y)}</option>
              );
            })}
          </select>
        </label>
        <label>
          Algorithm:
          <select value={algorithm} onChange={handleAlgorithmChange}>
            {algorithmOptions.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </label>
        <button onClick={handleSolve}>Show Solution</button>
      </div>
      {error && <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>}
      <ChessboardComponent
        onMove={() => {}}
        solution={solution}
        knightPosition={convertToChessNotation(start.x, start.y)}
      />
      {solution.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <strong>Solution Path:</strong>
          <ol style={{ columns: 4 }}>
            {solution.map((sq, idx) => (
              <li key={idx}>{sq}</li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

export default App;
