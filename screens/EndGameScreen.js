// screens/EndGameScreen.js - מסך סיום
import React, { useContext } from 'react';
import { GameContext } from '../state/GameContext';

const EndGameScreen = () => {
  const { gameState, dispatch } = useContext(GameContext);
  
  const newGame = () => {
    dispatch({ type: 'SET_SCREEN', payload: 'home' });
  };
  
  return (
    <div className="end-screen">
      <h2>{gameState.winner} ניצח!</h2>
      <button onClick={newGame}>משחק חדש</button>
    </div>
  );
};

export default EndGameScreen;
