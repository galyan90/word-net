// state/GameContext.js - Context לניהול מצב גלובלי

import React, { createContext, useReducer, useContext } from 'react';
import gameReducer, { initialState } from './reducer';
import { initializeGame, generateAIClue } from '../utils/wordGenerator';

export const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  // פעולות משחק
  const gameActions = {
    // התחלת משחק חדש
    startNewGame: () => {
      const gameData = initializeGame();
      dispatch({ type: 'INIT_GAME', payload: gameData });
    },

    // קבלת רמז מ-AI
    getAIClue: () => {
      const clue = generateAIClue(
        gameState.board, 
        gameState.currentTeam, 
        gameState.revealed
      );
      
      if (clue) {
        dispatch({ 
          type: 'SET_CLUE', 
          payload: { 
            clue: { word: clue.word, number: clue.number },
            guessesLeft: clue.number + 1
          }
        });
      }
    },

    // בחירת קלף
    selectCard: (cardId) => {
      if (gameState.phase !== 'guessing' || 
          gameState.revealed.has(cardId) || 
          gameState.guessesLeft <= 0 || 
          gameState.winner) {
        return;
      }

      const card = gameState.board.find(c => c.id === cardId);
      let feedback = null;
      let shouldEndTurn = false;

      if (card.type === 'assassin') {
        feedback = { text: '💀 מתנקש! המשחק נגמר!', type: 'bad' };
      } else if (card.type === gameState.currentTeam) {
        feedback = { text: '🎉 כל הכבוד! בחירה מעולה!', type: 'good' };
        
        // בדוק אם זה היה הניחוש האחרון
        if (gameState.guessesLeft <= 1) {
          shouldEndTurn = true;
          feedback = { 
            text: '🎉 סיימת את כל הניחושים שלך! התור עובר לקבוצה השנייה', 
            type: 'good' 
          };
        }
      } else {
        feedback = { text: '😊 לא נורא! תנסה שוב בפעם הבאה', type: 'bad' };
        shouldEndTurn = true;
      }

      dispatch({ 
        type: 'SELECT_CARD', 
        payload: { cardId, feedback }
      });

      // נקה פידבק אחרי 3 שניות
      setTimeout(() => {
        dispatch({ type: 'CLEAR_FEEDBACK' });
      }, 3000);

      // סיים תור אם צריך
      if (shouldEndTurn && !gameState.winner) {
        setTimeout(() => {
          dispatch({ type: 'END_TURN' });
        }, 2500);
      }
    },

    // סיום תור מוקדם
    endTurn: () => {
      dispatch({ type: 'END_TURN' });
    },

    // מעבר למסך
    setScreen: (screen) => {
      dispatch({ type: 'SET_SCREEN', payload: screen });
    },

    // איפוס משחק
    resetGame: () => {
      dispatch({ type: 'RESET_GAME' });
    }
  };

  return (
    <GameContext.Provider value={{ 
      gameState, 
      dispatch, 
      ...gameActions 
    }}>
      {children}
    </GameContext.Provider>
  );
};

// Hook להשימוש קל ב-Context
export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
