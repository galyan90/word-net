// components/GameBoard.js - רכיב לוח המשחק

import React from 'react';
import { useGame } from '../state/GameContext';
import WordCard from './WordCard';

const GameBoard = () => {
  const { gameState } = useGame();

  if (!gameState.board || gameState.board.length === 0) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '400px',
        fontSize: '18px',
        color: '#666'
      }}>
        טוען משחק...
      </div>
    );
  }

  return (
    <div 
      className="game-board"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '12px',
        maxWidth: '600px',
        margin: '0 auto',
        padding: '20px'
      }}
    >
      {gameState.board.map((card) => (
        <WordCard 
          key={card.id} 
          card={card} 
        />
      ))}
    </div>
  );
};

export default GameBoard;
