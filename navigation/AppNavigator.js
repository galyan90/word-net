// navigation/AppNavigator.js - ניווט בין מסכים
import React, { useContext } from 'react';
import { GameContext } from '../state/GameContext';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import EndGameScreen from '../screens/EndGameScreen';

const AppNavigator = () => {
  const { gameState } = useContext(GameContext);
  
  switch(gameState.screen) {
    case 'home':
      return <HomeScreen />;
    case 'game':
      return <GameScreen />;
    case 'end':
      return <EndGameScreen />;
    default:
      return <HomeScreen />;
  }
};

export default AppNavigator;
