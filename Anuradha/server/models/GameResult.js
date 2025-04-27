import mongoose from 'mongoose';

const gameResultSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    gameType: { type: String, enum: ['recursive', 'iterative', 'frameStewart'], required: true },
    numDisks: { type: Number, required: true },
    movesSubmitted: { type: Number, required: true },
    moveSequence: { type: [String], required: true },
    timeTakenMs: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

export default mongoose.model('GameResult', gameResultSchema);
