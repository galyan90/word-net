import React from 'react';
import { GameProvider } from './state/GameContext';
import AppNavigator from './navigation/AppNavigator';

function App() {
  return (
    <div className="App">
      <GameProvider>
        <AppNavigator />
      </GameProvider>
    </div>
  );
}

export default App;
