import React, { createContext, useReducer } from 'react';
import reducer from './reducer';

const initialState = {
  gameId: null,
  players: [],
  board: [],
  currentTurn: null
};

export const GameContext = createContext(initialState);

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GameContext.Provider value={{ ...state, dispatch }}>
      {children}
    </GameContext.Provider>
  );
};
