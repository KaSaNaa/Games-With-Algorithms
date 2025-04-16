// server/app.js
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import GameResult from './models/GameResult.js';
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB (update the connection string if needed)
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Endpoint to submit game results
app.post('/api/submit', async (req, res) => {
    try {
        const { userName, gameType, numDisks, movesSubmitted, moveSequence, timeTakenMs } = req.body;
        // Validate incoming data
        if (
            userName == null ||
            gameType == null ||
            numDisks == null ||
            movesSubmitted == null ||
            moveSequence == null ||
            timeTakenMs == null
        ) {
            return res.status(400).json({ error: 'Missing required fields.' });
        }
        const newGameResult = new GameResult({
            userName,
            gameType,
            numDisks,
            movesSubmitted,
            moveSequence,
            timeTakenMs
        });
        await newGameResult.save();
        res.status(201).json({ message: 'Game result saved successfully.' });
    } catch (error) {
        console.error('Error saving game result:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
