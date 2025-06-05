// navigation/AppNavigator.js - ניווט בין מסכי המשחק

import React from 'react';
import { useGame } from '../state/GameContext';
import HomeScreen from '../screens/HomeScreen';
import LobbyScreen from '../screens/LobbyScreen';
import GameScreen from '../screens/GameScreen';
import EndGameScreen from '../screens/EndGameScreen';

const AppNavigator = () => {
  const { gameState } = useGame();

  // רינדור המסך המתאים לפי המצב הנוכחי
  const renderScreen = () => {
    switch (gameState.screen) {
      case 'home':
        return <HomeScreen />;
        
      case 'lobby':
        return <LobbyScreen />;
        
      case 'game':
        return <GameScreen />;
        
      case 'end':
        return <EndGameScreen />;
        
      default:
        // אם יש מצב לא מוכר, חזור לבית
        console.warn(`Unknown screen: ${gameState.screen}`);
        return <HomeScreen />;
    }
  };

  return (
    <div className="app-navigator">
      {renderScreen()}
    </div>
  );
};

export default AppNavigator;
