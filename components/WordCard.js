// components/WordCard.js - רכיב קלף מילה

import React from 'react';
import { useGame } from '../state/GameContext';
import { CARD_STYLES } from '../constants/colors';

const WordCard = ({ card }) => {
  const { gameState, selectCard } = useGame();

  const isRevealed = gameState.revealed.has(card.id);
  const canSelect = gameState.phase === 'guessing' && 
                   !isRevealed && 
                   gameState.guessesLeft > 0 && 
                   !gameState.winner;

  const handleClick = () => {
    if (canSelect) {
      selectCard(card.id);
    }
  };

  // קבע סגנון הקלף
  const cardType = isRevealed ? card.type : 'hidden';
  const cardStyle = CARD_STYLES[cardType];

  const cardClasses = [
    'word-card',
    isRevealed ? 'revealed' : 'hidden',
    canSelect ? 'selectable' : 'disabled'
  ].join(' ');

  return (
    <button
      className={cardClasses}
      onClick={handleClick}
      disabled={!canSelect}
      style={{
        aspectRatio: '1',
        border: `3px solid ${cardStyle.borderColor}`,
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        fontSize: '14px',
        cursor: canSelect ? 'pointer' : 'default',
        transition: 'all 0.3s ease',
        textAlign: 'center',
        padding: '8px',
        backgroundColor: cardStyle.backgroundColor,
        color: cardStyle.color,
        opacity: isRevealed ? 0.8 : 1,
        transform: canSelect && !isRevealed ? 'scale(1)' : 'scale(1)',
        boxShadow: isRevealed ? '0 4px 8px rgba(0,0,0,0.2)' : '0 2px 4px rgba(0,0,0,0.1)'
      }}
      onMouseEnter={(e) => {
        if (canSelect) {
          e.target.style.transform = 'scale(1.05)';
          e.target.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
        }
      }}
      onMouseLeave={(e) => {
        if (canSelect) {
          e.target.style.transform = 'scale(1)';
          e.target.style.boxShadow = '0 2px 4px rgba(0,0,0,0.1)';
        }
      }}
    >
      <div style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        lineHeight: '1.2'
      }}>
        {card.word}
      </div>
    </button>
  );
};

export default WordCard;
