import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

const Home = () => {
    const [userName, setUserName] = useState('');
    const [gameType, setGameType] = useState('recursive');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleStart = () => {
        if (userName.trim() === '') {
            setError('Please enter your name.');
            return;
        }
        navigate('game', { state: { userName, gameType } });
    };

    const handleBack = () => {
        navigate('/');  // navigates to the root URL
    };

    return (
        <div className={styles.towerHanoiContainer}>
            <h1>Tower of Hanoi</h1>
            <div className={styles.formGroup}>
                <label>Enter your name:</label>
                <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="Your Name"
                />
            </div>
            <div className={styles.formGroup}>
                <label>Choose game type:</label>
                <select value={gameType} onChange={(e) => setGameType(e.target.value)}>
                    <option value="recursive">3-Peg Recursive</option>
                    <option value="iterative">3-Peg Iterative</option>
                    <option value="frameStewart">4-Peg Frame-Stewart</option>
                </select>
            </div>
            <button className={styles.button} onClick={handleStart}>
                Start Game
            </button>
            <button className={styles.backButton} onClick={handleBack}>
                Back to Main Menu
            </button>

            {error && (
                <div className={styles.errorOverlay}>
                    <div className={styles.errorModal}>
                        <p>{error}</p>
                        <button onClick={() => setError('')}>Dismiss</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Home;