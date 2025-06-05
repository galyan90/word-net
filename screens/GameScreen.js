// screens/GameScreen.js - מסך המשחק הראשי

import React from 'react';
import { useGame } from '../state/GameContext';
import GameBoard from '../components/GameBoard';
import PlayerList from '../components/PlayerList';

const GameScreen = () => {
  const { gameState, getAIClue, endTurn, setScreen } = useGame();

  const handleGetClue = () => {
    getAIClue();
  };

  const handleEndTurn = () => {
    endTurn();
  };

  const handleGoHome = () => {
    setScreen('home');
  };

  const handleNewGame = () => {
    setScreen('home');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto'
      }}>
        {/* כפתור בית */}
        <div style={{ marginBottom: '20px' }}>
          <button
            onClick={handleGoHome}
            style={{
              background: '#64748b',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '12px 16px',
              cursor: 'pointer',
              fontSize: '16px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#475569';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#64748b';
            }}
          >
            🏠 בית
          </button>
        </div>

        {/* מידע שחקנים וניקוד */}
        <PlayerList />

        {/* הודעת פידבק */}
        {gameState.feedback && (
          <div style={{
            textAlign: 'center',
            padding: '20px',
            margin: '20px 0',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: 'bold',
            background: gameState.feedback.type === 'good' 
              ? 'linear-gradient(135deg, #dcfce7 0%, #bbf7d0 100%)'
              : 'linear-gradient(135deg, #fef2f2 0%, #fecaca 100%)',
            border: gameState.feedback.type === 'good'
              ? '2px solid #22c55e'
              : '2px solid #ef4444',
            color: gameState.feedback.type === 'good' ? '#15803d' : '#dc2626',
            animation: 'fadeIn 0.5s ease'
          }}>
            {gameState.feedback.text}
          </div>
        )}

        {/* תיבת רמז נוכחי */}
        {gameState.clue.word && (
          <div style={{
            background: 'linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%)',
            border: '2px solid #0288d1',
            borderRadius: '16px',
            padding: '24px',
            margin: '20px 0',
            textAlign: 'center'
          }}>
            <div style={{
              fontSize: '14px',
              color: '#0277bd',
              marginBottom: '8px'
            }}>
              הרמז הנוכחי:
            </div>
            <div style={{
              fontSize: '28px',
              fontWeight: 'bold',
              color: '#01579b',
              marginBottom: '8px'
            }}>
              "{gameState.clue.word}"
            </div>
            <div style={{
              fontSize: '20px',
              fontWeight: 'bold',
              color: '#0288d1',
              marginBottom: '12px'
            }}>
              {gameState.clue.number} מילים
            </div>
            {gameState.phase === 'guessing' && gameState.guessesLeft > 0 && (
              <div style={{
                display: 'inline-block',
                background: '#fff3cd',
                color: '#856404',
                padding: '8px 16px',
                borderRadius: '20px',
                fontSize: '16px',
                fontWeight: 'bold',
                border: '2px solid #ffeaa7'
              }}>
                נותרו {gameState.guessesLeft} ניחושים
              </div>
            )}
          </div>
        )}

        {/* כפתורי פעולה */}
        <div style={{
          display: 'flex',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '20px',
          flexWrap: 'wrap'
        }}>
          {gameState.phase === 'spymaster' && !gameState.winner && (
            <button
              onClick={handleGetClue}
              style={{
                background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 24px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(139, 92, 246, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(139, 92, 246, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 16px rgba(139, 92, 246, 0.3)';
              }}
            >
              🤖 קבל רמז מ-AI
            </button>
          )}

          {gameState.phase === 'guessing' && !gameState.winner && (
            <button
              onClick={handleEndTurn}
              style={{
                background: 'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '16px 24px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 16px rgba(249, 115, 22, 0.3)'
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(249, 115, 22, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 16px rgba(249, 115, 22, 0.3)';
              }}
            >
              ⏭️ סיים תור מוקדם
            </button>
          )}

          <button
            onClick={handleNewGame}
            style={{
              background: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              padding: '16px 24px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 16px rgba(34, 197, 94, 0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 6px 20px rgba(34, 197, 94, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 16px rgba(34, 197, 94, 0.3)';
            }}
          >
            🎮 משחק חדש
          </button>
        </div>

        {/* לוח המשחק */}
        <GameBoard />
      </div>
    </div>
  );
};

export default GameScreen;
