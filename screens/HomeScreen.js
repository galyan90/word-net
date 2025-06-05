import React, { useContext } from 'react';
import { View, Button } from 'react-native';
import { createGame } from '../services/api';
import { GameContext } from '../state/GameContext';

export default function HomeScreen({ navigation }) {
  const { dispatch } = useContext(GameContext);

  const handleNewGame = async () => {
    const res = await createGame();
    dispatch({ type: 'SET_GAME_ID', payload: res.gameId });
    navigation.navigate('Lobby');
  };

  return (
    <View>
      <Button title="Start New Game" onPress={handleNewGame} />
    </View>
  );
}
