import React, { useState, useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // <-- add useNavigate
import Tower from './components/Tower';
import { hanoiRecursive, hanoiIterative, frameStewart } from './algorithms';
import './Game.css';

const initialTowers3Peg = (numDisks) => ({
    A: Array.from({ length: numDisks }, (_, i) => numDisks - i),
    B: [],
    C: []
});

const initialTowers4Peg = (numDisks) => ({
    A: Array.from({ length: numDisks }, (_, i) => numDisks - i),
    B: [],
    C: [],
    D: []
});

const Game = () => {
    const { state } = useLocation();
    const { userName, gameType } = state || {};
    const navigate = useNavigate(); // initialize navigate

    // Initialize states as null so nothing is rendered until startGame() sets them.
    const [numDisks, setNumDisks] = useState(null);
    const [initialTowers, setInitialTowers] = useState(null);
    const [towers, setTowers] = useState(null);
    const [moveSequence, setMoveSequence] = useState('');
    const [selectedPeg, setSelectedPeg] = useState(null);
    const [message, setMessage] = useState('');
    const [startTime, setStartTime] = useState(null);
    const [gameCompleted, setGameCompleted] = useState(false);

    const textAreaRef = useRef(null);

    const moveCount =
        moveSequence.trim() === ''
            ? 0
            : moveSequence.split(',').filter(move => move.trim() !== '').length;

    useEffect(() => {
        if (!userName) return;
        startGame();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        processMoves();
        autoResizeTextArea();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [moveSequence]);

    const autoResizeTextArea = () => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = 'auto';
            textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
        }
    };

    const startGame = () => {
        const randomDisks = Math.floor(Math.random() * 6) + 5; // random between 5 and 10
        setNumDisks(randomDisks);
        const initTowers =
            gameType === 'frameStewart'
                ? initialTowers4Peg(randomDisks)
                : initialTowers3Peg(randomDisks);
        setInitialTowers(initTowers);
        setTowers(initTowers);
        setMoveSequence('');
        setSelectedPeg(null);
        setMessage('');
        setStartTime(Date.now());
        setGameCompleted(false);
    };

    const processMoves = () => {
        if (!initialTowers) return;
        let currentTowers = JSON.parse(JSON.stringify(initialTowers));
        const pegLabels = gameType === 'frameStewart' ? ['A', 'B', 'C', 'D'] : ['A', 'B', 'C'];

        if (moveSequence.trim() === '') {
            setTowers(currentTowers);
            setMessage('');
            return;
        }

        const moves = moveSequence.split(',').map(move => move.trim());
        let error = '';
        for (let move of moves) {
            if (move === '') continue;
            const parts = move.split('->').map(x => x.trim());
            if (parts.length < 2 || parts[0] === '' || parts[1] === '') {
                continue;
            }
            const [from, to] = parts;
            if (!pegLabels.includes(from) || !pegLabels.includes(to)) {
                error = `Invalid peg name in move: "${move}"`;
                break;
            }
            if (currentTowers[from].length === 0) {
                error = `No disk on peg ${from} for move: "${move}"`;
                break;
            }
            const disk = currentTowers[from][currentTowers[from].length - 1];
            if (currentTowers[to].length > 0) {
                const destTop = currentTowers[to][currentTowers[to].length - 1];
                if (disk > destTop) {
                    error = `Invalid move: Disk ${disk} cannot be placed on smaller disk ${destTop} in move: "${move}"`;
                    break;
                }
            }
            currentTowers[from].pop();
            currentTowers[to].push(disk);
        }
        setTowers(currentTowers);
        setMessage(error);

        const destPeg = gameType === 'frameStewart' ? 'D' : 'C';
        if (!error && currentTowers[destPeg].length === numDisks && !gameCompleted) {
            setGameCompleted(true);
            submitGameResult();
        }
    };

    const submitGameResult = async () => {
        let solution = [];
        const algoStart = performance.now();
        if (gameType === 'recursive') {
            solution = hanoiRecursive(numDisks, 'A', 'B', 'C');
        } else if (gameType === 'iterative') {
            solution = hanoiIterative(numDisks, 'A', 'B', 'C');
        } else if (gameType === 'frameStewart') {
            solution = frameStewart(numDisks, ['A', 'B', 'C', 'D']);
        }
        const algoTime = performance.now() - algoStart;

        const data = {
            userName,
            gameType,
            numDisks,
            movesSubmitted: moveCount,
            moveSequence: moveSequence.split(',').map(m => m.trim()),
            timeTakenMs: algoTime
        };

        try {
            await fetch('http://localhost:5000/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
        } catch (error) {
            console.error('Error recording game result:', error);
        }
    };

    const handlePegClick = (pegName) => {
        if (gameCompleted) return; // Do not allow moves after completion
        setMessage('');
        if (!selectedPeg) {
            if (towers[pegName].length === 0) {
                setMessage(`Peg ${pegName} is empty. Select a peg with a disk.`);
                return;
            }
            setSelectedPeg(pegName);
        } else {
            if (selectedPeg === pegName) {
                setSelectedPeg(null);
                return;
            }
            if (towers[selectedPeg].length === 0) {
                setMessage(`Peg ${selectedPeg} is empty.`);
                setSelectedPeg(null);
                return;
            }
            const movingDisk = towers[selectedPeg][towers[selectedPeg].length - 1];
            if (towers[pegName].length > 0) {
                const destTop = towers[pegName][towers[pegName].length - 1];
                if (movingDisk > destTop) {
                    setMessage(`Invalid move: Disk ${movingDisk} cannot be placed on smaller disk ${destTop}.`);
                    setSelectedPeg(null);
                    return;
                }
            }
            const newTowers = { ...towers };
            newTowers[selectedPeg] = [...newTowers[selectedPeg]];
            newTowers[pegName] = [...newTowers[pegName]];
            newTowers[selectedPeg].pop();
            newTowers[pegName].push(movingDisk);
            setTowers(newTowers);

            const newMove =
                moveSequence.trim() === '' ? `${selectedPeg}->${pegName}` : `${moveSequence}, ${selectedPeg}->${pegName}`;
            setMoveSequence(newMove);
            setSelectedPeg(null);
        }
    };

    const handleMoveSequenceChange = (e) => {
        if (gameCompleted) return; // Prevent changes after completion
        setMoveSequence(e.target.value);
    };

    const handleChangeGameType = () => {
        navigate('/'); // go back to home to change game type
    };

    // Don't attempt to render until towers is set by startGame()
    if (!towers || numDisks === null) {
        return <div>Loading...</div>;
    }

    return (
        <div className="game-container">
            <h1>Welcome, {userName}!</h1>
            <h2>
                Tower of Hanoi Game -{' '}
                {gameType === 'frameStewart'
                    ? '4-Peg Frame-Stewart'
                    : gameType === 'iterative'
                        ? '3-Peg Iterative'
                        : '3-Peg Recursive'}
            </h2>
            <div className="game-controls">
                <button onClick={startGame} className="restart-button" disabled={gameCompleted}>
                    Restart Game
                </button>
                <button onClick={handleChangeGameType} className="quit-button" disabled={gameCompleted}>
                    Quit
                </button>
            </div>
            <div className="game-board">
                <h3>Number of disks: {numDisks}</h3>
                <div className="towers-container">
                    {Object.keys(towers).map((peg) => (
                        <Tower
                            key={peg}
                            pegName={peg}
                            disks={towers[peg]}
                            selected={selectedPeg === peg}
                            onClick={() => handlePegClick(peg)}
                        />
                    ))}
                </div>
            </div>
            <div className="move-sequence">
                <h3>Move Sequence (Total moves: {moveCount})</h3>
                <textarea
                    ref={textAreaRef}
                    value={moveSequence}
                    onChange={handleMoveSequenceChange}
                    rows="1"
                    className="move-sequence-text"
                    placeholder="Enter moves manually or use clicks..."
                    disabled={gameCompleted}
                ></textarea>
            </div>

            {/* Add error overlay */}
            {message && (
                <div className="error-overlay">
                    <div className="error-modal">
                        <p>{message}</p>
                        <button onClick={() => setMessage('')}>Dismiss</button>
                    </div>
                </div>
            )}

            {gameCompleted && (
                <div className="congratulations-overlay">
                    <div className="congratulations-modal">
                        <h2>Congratulations!</h2>
                        <p>You have successfully completed the game in {moveCount} moves.</p>
                        <div className="button-group">
                            <button onClick={startGame}>Restart Game</button>
                            <button onClick={handleChangeGameType}>Change Game Type</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Game;