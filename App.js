// App.js - נקודת הכניסה הראשית
import React from 'react';
import { GameProvider } from './state/GameContext';
import AppNavigator from './navigation/AppNavigator';

function App() {
  return (
    <GameProvider>
      <AppNavigator />
    </GameProvider>
  );
}

export default App;
