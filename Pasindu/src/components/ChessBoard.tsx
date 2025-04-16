import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

interface ChessboardProps {
  onMove: (from: string, to: string) => void;
  solution?: string[]; // Array of chess notation strings representing the tour path
  knightPosition?: string; // Current knight position in chess notation
}

const ChessboardComponent: React.FC<ChessboardProps> = ({ onMove, solution = [], knightPosition }) => {
  const [chess] = useState<Chess>(new Chess());
  const [position, setPosition] = useState('start');

  useEffect(() => {
    chess.clear();
    // If knightPosition is provided, place knight there, else default to a1
    chess.put({ type: 'n', color: 'w' }, knightPosition || 'a1');
    setPosition(chess.fen());
  }, [chess, knightPosition]);
  
  // Handle piece movement
  const handleMove = (from: string, to: string, _piece: string) => {
    try {
      // Try to make move
      const move = chess.move({
        from,
        to,
        promotion: 'q',
      });
      
      if (move) {
        setPosition(chess.fen());
        onMove(from, to);
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  };

  return (
    <div style={{ width: '600px', margin: '0 auto' }}>
      <Chessboard
        position={position}
        onPieceDrop={handleMove}
        customBoardStyle={{
          borderRadius: '5px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.5)'
        }}
      />
    </div>
  );
};

export default ChessboardComponent;