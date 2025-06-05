// components/WordCard.js - קלף מילה
import React, { useContext } from 'react';
import { GameContext } from '../state/GameContext';
import { CARD_COLORS } from '../constants/colors';

const WordCard = ({ card }) => {
  const { gameState, dispatch } = useContext(GameContext);
  
  const selectCard = () => {
    dispatch({ type: 'SELECT_CARD', payload: card.id });
  };
  
  const isRevealed = gameState.revealed.has(card.id);
  const cardStyle = isRevealed ? CARD_COLORS[card.type] : CARD_COLORS.hidden;
  
  return (
    <button className={`word-card ${cardStyle}`} onClick={selectCard}>
      {card.word}
    </button>
  );
};

export default WordCard;
