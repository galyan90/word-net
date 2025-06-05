// screens/GameScreen.js - מסך המשחק
import React, { useContext } from 'react';
import { GameContext } from '../state/GameContext';
import GameBoard from '../components/GameBoard';

const GameScreen = () => {
  const { gameState, dispatch } = useContext(GameContext);
  
  return (
    <div className="game-screen">
      <div className="game-header">
        <span>תור: {gameState.currentTeam}</span>
        <span>ניקוד: {gameState.score.red}:{gameState.score.blue}</span>
      </div>
      <GameBoard />
    </div>
  );
};

export default GameScreen;
