// components/GameBoard.js - לוח המשחק
import React, { useContext } from 'react';
import { GameContext } from '../state/GameContext';
import WordCard from './WordCard';

const GameBoard = () => {
  const { gameState } = useContext(GameContext);
  
  return (
    <div className="game-board">
      {gameState.board.map(card => (
        <WordCard key={card.id} card={card} />
      ))}
    </div>
  );
};

export default GameBoard;
