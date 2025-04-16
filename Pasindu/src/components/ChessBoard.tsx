import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

interface ChessboardProps {
  onMove: (from: string, to: string) => boolean | void;
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

  // Only allow moving the knight from the current position
  const handleMove = (from: string, to: string, _piece: string) => {
    if (from !== (knightPosition || 'a1')) return false;
    const valid = onMove(from, to);
    if (valid) {
      chess.clear();
      chess.put({ type: 'n', color: 'w' }, to);
      setPosition(chess.fen());
      return true;
    }
    return false;
  };

  // Highlight the solution path (player's moves)
  const getSquareStyles = () => {
    const styles: Record<string, React.CSSProperties> = {};
    if (solution && solution.length > 0) {
      solution.forEach((sq, idx) => {
        styles[sq] = {
          background: idx === solution.length - 1 ? '#ff0' : '#aaf',
        };
      });
    }
    return styles;
  };

  return (
    <div style={{ width: 'min(90vw, 520px)', margin: '0 auto', background: '#f5f5f5', borderRadius: 8, padding: 16, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
      <Chessboard
        position={position}
        onPieceDrop={handleMove}
        customBoardStyle={{
          borderRadius: '5px',
          boxShadow: '0 5px 15px rgba(0, 0, 0, 0.15)'
        }}
        customSquareStyles={getSquareStyles()}
        arePiecesDraggable={true}
      />
    </div>
  );
};

export default ChessboardComponent;