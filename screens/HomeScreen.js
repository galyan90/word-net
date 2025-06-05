// screens/HomeScreen.js - מסך הבית
import React, { useContext } from 'react';
import { GameContext } from '../state/GameContext';
import { initializeGame } from '../utils/wordGenerator';

const HomeScreen = () => {
  const { dispatch } = useContext(GameContext);
  
  const startGame = () => {
    const gameData = initializeGame();
    dispatch({ type: 'INIT_GAME', payload: gameData });
    dispatch({ type: 'SET_SCREEN', payload: 'game' });
  };
  
  return (
    <div className="home-screen">
      <h1>Codenames</h1>
      <button onClick={startGame}>התחל משחק</button>
    </div>
  );
};

export default HomeScreen;
