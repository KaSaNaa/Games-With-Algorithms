import React, { useState, useRef } from 'react';
import ChessboardComponent from './components/ChessBoard';
import { solveKnightTour } from './algorithms/backtracking';
import { solveWarnsdorffTour } from './algorithms/warnsdorff';
import { BOARD_SIZE, convertToChessNotation } from './utils/boardUtils';
import type { PlayerResult } from './types';
import { isKnightMove } from './utils/boardUtils';
import { loadResults, saveResult } from './services/storage';

// MUI imports
import { Container, Box, Typography, Button, Snackbar, Alert, TextField, MenuItem, Select, InputLabel, FormControl, Paper, List, ListItem, ListItemText, Divider } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import SportsEsportsIcon from '@mui/icons-material/SportsEsports';
import ExtensionIcon from '@mui/icons-material/Extension';
import RestartAltIcon from '@mui/icons-material/RestartAlt';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FlagIcon from '@mui/icons-material/Flag';

const algorithmOptions = [
  { label: 'Backtracking', value: 'backtracking' },
  { label: "Warnsdorff's Heuristic", value: 'warnsdorff' },
];

enum GameMode {
  MENU = 'menu',
  KNIGHTS_TOUR = 'knights_tour',
  SOLVER = 'solver'
}

function getRandomStart() {
  return {
    x: Math.floor(Math.random() * BOARD_SIZE),
    y: Math.floor(Math.random() * BOARD_SIZE)
  };
}

function getValidKnightMoves(from: string, visited: string[]): string[] {
  const files = 'abcdefgh';
  const fromX = 8 - parseInt(from[1]);
  const fromY = files.indexOf(from[0]);
  const moves: string[] = [];
  [
    [2, 1], [1, 2], [-1, 2], [-2, 1],
    [-2, -1], [-1, -2], [1, -2], [2, -1]
  ].forEach(([dx, dy]) => {
    const nx = fromX + dx;
    const ny = fromY + dy;
    if (nx >= 0 && nx < 8 && ny >= 0 && ny < 8) {
      const sq = `${files[ny]}${8 - nx}`;
      if (!visited.includes(sq)) moves.push(sq);
    }
  });
  return moves;
}

function App() {
  const [mode, setMode] = useState<GameMode>(GameMode.MENU);

  // For solver mode (existing)
  const [start, setStart] = useState({ x: 0, y: 0 });
  const [algorithm, setAlgorithm] = useState('backtracking');
  const [solution, setSolution] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const workerRef = useRef<Worker | null>(null);

  // For Knight's Tour Game
  const [gameStart, setGameStart] = useState(getRandomStart());
  const [playerMoves, setPlayerMoves] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<'playing' | 'win' | 'lose' | 'draw' | null>(null);
  const [playerName, setPlayerName] = useState('');
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [results, setResults] = useState<PlayerResult[]>(loadResults());

  // Snackbar state
  const [snackbar, setSnackbar] = useState<{ open: boolean, message: string, severity: 'success' | 'error' | 'info' | 'warning' }>({ open: false, message: '', severity: 'info' });

  // Menu navigation
  const handleMenuSelect = (selected: GameMode) => {
    setMode(selected);
    if (selected === GameMode.KNIGHTS_TOUR) {
      const randomStart = getRandomStart();
      setGameStart(randomStart);
      setPlayerMoves([convertToChessNotation(randomStart.x, randomStart.y)]);
      setGameStatus('playing');
      setError(null);
    }
  };

  // Player move handler
  const handlePlayerMove = (from: string, to: string) => {
    if (gameStatus !== 'playing') return false;
    if (!isKnightMove(from, to)) {
      setError('Invalid knight move!');
      setSnackbar({ open: true, message: 'Invalid knight move!', severity: 'error' });
      return false;
    }
    if (playerMoves.includes(to)) {
      setError('Square already visited!');
      setSnackbar({ open: true, message: 'Square already visited!', severity: 'warning' });
      return false;
    }
    const newMoves = [...playerMoves, to];
    setPlayerMoves(newMoves);
    setError(null);

    // Win condition
    if (newMoves.length === BOARD_SIZE * BOARD_SIZE) {
      setGameStatus('win');
      setShowNamePrompt(true);
      setSnackbar({ open: true, message: "Congratulations! Tour complete!", severity: 'success' });
      return true;
    }
    // Lose condition: no valid moves left
    const nextMoves = getValidKnightMoves(to, newMoves);
    if (nextMoves.length === 0) {
      setGameStatus('lose');
      setSnackbar({ open: true, message: "No valid moves left. You lost!", severity: 'error' });
      return true;
    }
    return true;
  };

  // Give up (draw)
  const handleGiveUp = () => {
    setGameStatus('draw');
    setSnackbar({ open: true, message: "Game ended in a draw.", severity: 'info' });
  };

  // Reset game
  const handleRestartGame = () => {
    const randomStart = getRandomStart();
    setGameStart(randomStart);
    setPlayerMoves([convertToChessNotation(randomStart.x, randomStart.y)]);
    setGameStatus('playing');
    setError(null);
    setShowNamePrompt(false);
    setPlayerName('');
    setSnackbar({ open: true, message: "Game restarted!", severity: 'info' });
  };

  // Save winner
  const handleSaveWinner = () => {
    const result: PlayerResult = {
      name: playerName,
      moves: playerMoves,
      date: new Date().toISOString(),
    };
    saveResult(result);
    setResults(loadResults());
    setShowNamePrompt(false);
    setSnackbar({ open: true, message: "Result saved!", severity: 'success' });
  };

  // Solver mode handlers (existing)
  const handleStartChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const [x, y] = e.target.value.split(',').map(Number);
    setStart({ x, y });
  };

  const handleAlgorithmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAlgorithm(e.target.value);
  };

  const handleSolve = () => {
    setError(null);
    setSolution([]);
    setLoading(true);

    if (algorithm === 'backtracking') {
      // Dynamically import the worker
      if (workerRef.current) {
        workerRef.current.terminate();
      }
      // @ts-ignore
      workerRef.current = new Worker(new URL('./algorithms/knightTourWorker.ts', import.meta.url), { type: 'module' });
      workerRef.current.onmessage = (e: MessageEvent) => {
        const moves = e.data;
        setLoading(false);
        if (!moves) {
          setError('No solution found for this starting position.');
          setSolution([]);
          setSnackbar({ open: true, message: 'No solution found for this starting position.', severity: 'warning' });
        } else {
          setSolution(moves.map((pos: { x: number; y: number }) => convertToChessNotation(pos.x, pos.y)));
          setSnackbar({ open: true, message: 'Solution found!', severity: 'success' });
        }
        workerRef.current?.terminate();
        workerRef.current = null;
      };
      workerRef.current.postMessage({ startX: start.x, startY: start.y });
    } else {
      // Warnsdorff's is fast, run on main thread
      let moves = solveWarnsdorffTour(start.x, start.y);
      setLoading(false);
      if (!moves) {
        setError('No solution found for this starting position.');
        setSolution([]);
        setSnackbar({ open: true, message: 'No solution found for this starting position.', severity: 'warning' });
      } else {
        setSolution(moves.map(pos => convertToChessNotation(pos.x, pos.y)));
        setSnackbar({ open: true, message: 'Solution found!', severity: 'success' });
      }
    }
  };

  // Snackbar close handler
  const handleSnackbarClose = () => setSnackbar({ ...snackbar, open: false });

  // Render
  if (mode === GameMode.MENU) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h3" align="center" gutterBottom>
            <ExtensionIcon fontSize="large" sx={{ verticalAlign: "middle", mr: 1 }} />
            Chess Game Menu
          </Typography>
          <Box display="flex" gap={2} justifyContent="center" my={3}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SportsEsportsIcon />}
              onClick={() => handleMenuSelect(GameMode.KNIGHTS_TOUR)}
              sx={{ px: 4, py: 2, borderRadius: 2, fontWeight: 600 }}
            >
              Knight's Tour Problem
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="large"
              startIcon={<ExtensionIcon />}
              onClick={() => handleMenuSelect(GameMode.SOLVER)}
              sx={{ px: 4, py: 2, borderRadius: 2, fontWeight: 600 }}
            >
              Knight's Tour Solver
            </Button>
          </Box>
          <Divider sx={{ my: 3 }} />
          <Typography variant="h5" gutterBottom align="center">
            <EmojiEventsIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            Leaderboard
          </Typography>
          {results.length === 0 ? (
            <Typography align="center" color="text.secondary">No winners yet.</Typography>
          ) : (
            <List sx={{ maxHeight: 220, overflow: 'auto', bgcolor: 'background.paper', borderRadius: 2 }}>
              {results.map((r, idx) => (
                <ListItem key={idx} divider>
                  <ListItemText
                    primary={`${r.name} (${r.moves.length} moves)`}
                    secondary={new Date(r.date).toLocaleString()}
                  />
                </ListItem>
              ))}
            </List>
          )}
        </Paper>
        <Snackbar open={snackbar.open} autoHideDuration={2500} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    );
  }

  if (mode === GameMode.KNIGHTS_TOUR) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Typography variant="h4" align="center" gutterBottom>
            <SportsEsportsIcon sx={{ verticalAlign: "middle", mr: 1 }} />
            Knight's Tour Game
          </Typography>
          <Box display="flex" gap={2} mb={2} justifyContent="center">
            <Button
              variant="contained"
              color="primary"
              startIcon={<RestartAltIcon />}
              onClick={handleRestartGame}
              sx={{ fontWeight: 600 }}
            >
              Restart Game
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              startIcon={<ArrowBackIcon />}
              onClick={() => setMode(GameMode.MENU)}
              sx={{ fontWeight: 600 }}
            >
              Back to Menu
            </Button>
            <Button
              variant="contained"
              color="warning"
              startIcon={<FlagIcon />}
              onClick={handleGiveUp}
              disabled={gameStatus !== 'playing'}
              sx={{ fontWeight: 600 }}
            >
              Give Up
            </Button>
          </Box>
          <Typography align="center" color="text.secondary" mb={2}>
            Visit every square exactly once with the knight!
          </Typography>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>
          )}
          <Box my={2}>
            <ChessboardComponent
              onMove={handlePlayerMove}
              solution={playerMoves}
              knightPosition={playerMoves[playerMoves.length - 1]}
            />
          </Box>
          <Typography align="center" sx={{ mt: 2 }}>
            <strong>Moves:</strong> {playerMoves.join(' → ')}
          </Typography>
          {gameStatus === 'win' && (
            <Alert severity="success" sx={{ mt: 3, fontWeight: 600 }}>
              Congratulations! You completed the Knight's Tour!
            </Alert>
          )}
          {gameStatus === 'lose' && (
            <Alert severity="error" sx={{ mt: 3, fontWeight: 600 }}>
              No valid moves left. You lost!
            </Alert>
          )}
          {gameStatus === 'draw' && (
            <Alert severity="warning" sx={{ mt: 3, fontWeight: 600 }}>
              Game ended in a draw.
            </Alert>
          )}
          {showNamePrompt && (
            <Box mt={4} display="flex" flexDirection="column" alignItems="center" gap={2}>
              <TextField
                label="Enter your name to save your result"
                value={playerName}
                onChange={e => setPlayerName(e.target.value)}
                variant="outlined"
                sx={{ minWidth: 300 }}
              />
              <Button
                variant="contained"
                color="success"
                onClick={handleSaveWinner}
                disabled={!playerName.trim()}
                sx={{ fontWeight: 600 }}
              >
                Save
              </Button>
            </Box>
          )}
        </Paper>
        <Snackbar open={snackbar.open} autoHideDuration={2500} onClose={handleSnackbarClose}>
          <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    );
  }

  // Existing solver mode
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          <ExtensionIcon sx={{ verticalAlign: "middle", mr: 1 }} />
          Knight's Tour Visualizer
        </Typography>
        <Box display="flex" gap={3} mb={3} flexWrap="wrap" alignItems="center" justifyContent="center">
          <FormControl sx={{ minWidth: 140 }}>
            <InputLabel>Start Position</InputLabel>
            <Select
              value={`${start.x},${start.y}`}
              label="Start Position"
              onChange={e => handleStartChange(e as any)}
              size="small"
            >
              {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, idx) => {
                const x = Math.floor(idx / BOARD_SIZE);
                const y = idx % BOARD_SIZE;
                return (
                  <MenuItem key={idx} value={`${x},${y}`}>{convertToChessNotation(x, y)}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <FormControl sx={{ minWidth: 180 }}>
            <InputLabel>Algorithm</InputLabel>
            <Select
              value={algorithm}
              label="Algorithm"
              onChange={e => handleAlgorithmChange(e as any)}
              size="small"
            >
              {algorithmOptions.map(opt => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSolve}
            sx={{ fontWeight: 600 }}
          >
            Show Solution
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<ArrowBackIcon />}
            onClick={() => setMode(GameMode.MENU)}
            sx={{ fontWeight: 600 }}
          >
            Back to Menu
          </Button>
        </Box>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {loading && (
          <Alert severity="info" sx={{ mb: 2 }}>
            Solving Knight's Tour... Please wait.
          </Alert>
        )}
        <Box my={2}>
          <ChessboardComponent
            onMove={() => {}}
            solution={solution}
            knightPosition={convertToChessNotation(start.x, start.y)}
          />
        </Box>
        {solution.length > 0 && (
          <Box mt={4}>
            <Typography variant="h6" gutterBottom>
              Solution Path:
            </Typography>
            <Box sx={{ columns: { xs: 1, sm: 2, md: 4 } }}>
              <ol style={{ margin: 0, paddingLeft: 20 }}>
                {solution.map((sq, idx) => (
                  <li key={idx}>{sq}</li>
                ))}
              </ol>
            </Box>
          </Box>
        )}
      </Paper>
      <Snackbar open={snackbar.open} autoHideDuration={2500} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
