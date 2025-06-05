// state/GameContext.js - ניהול מצב המשחק
import React, { createContext, useReducer } from 'react';
import gameReducer, { initialState } from './reducer';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);
  
  return (
    <GameContext.Provider value={{ gameState, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
