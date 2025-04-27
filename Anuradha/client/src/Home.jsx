import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';  // Create additional styles as needed

const Home = () => {
    const [userName, setUserName] = useState('');
    const [gameType, setGameType] = useState('recursive');
    const navigate = useNavigate();

    const handleStart = () => {
        // Navigate to /game passing parameters in state.
        if (userName.trim() === '') {
            alert('Please enter your name.');
            return;
        }
        navigate('/game', { state: { userName, gameType } });
    };

    return (
        <div className="home-container">
            <h1>Tower of Hanoi</h1>
            <div className="form-group">
                <label>Enter your name:</label>
                <input
                    type="text"
                    value={userName}
                    onChange={e => setUserName(e.target.value)}
                    placeholder="Your Name"
                />
            </div>
            <div className="form-group">
                <label>Choose game type:</label>
                <select value={gameType} onChange={e => setGameType(e.target.value)}>
                    <option value="recursive">3-Peg Recursive</option>
                    <option value="iterative">3-Peg Iterative</option>
                    <option value="frameStewart">4-Peg Frame-Stewart</option>
                </select>
            </div>
            <button onClick={handleStart}>Start Game</button>
        </div>
    );
};

export default Home;
