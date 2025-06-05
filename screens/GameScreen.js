import React, { useContext } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { GameContext } from '../state/GameContext';
import WordCard from '../components/WordCard';

export default function GameScreen() {
  const { board, currentTurn } = useContext(GameContext);

  const renderItem = ({ item }) => (
    <WordCard word={item.word} revealed={item.revealed} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.turnText}>
        Current Turn: {currentTurn === 'red' ? '🔴 Red' : '🔵 Blue'}
      </Text>

      <FlatList
        data={board}
        numColumns={5}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        contentContainerStyle={styles.board}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f6f6f6'
  },
  turnText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  },
  board: {
    justifyContent: 'center'
  }
});
