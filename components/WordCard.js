import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function WordCard({ word, revealed }) {
  return (
    <TouchableOpacity style={[styles.card, revealed && styles.revealed]}>
      <Text style={styles.word}>{word}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 65,
    height: 65,
    backgroundColor: '#ffffff',
    margin: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  revealed: {
    backgroundColor: '#ddd'
  },
  word: {
    fontSize: 12,
    textAlign: 'center'
  }
});
