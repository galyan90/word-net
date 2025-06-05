// screens/HomeScreen.js - מסך הבית

import React from 'react';
import { useGame } from '../state/GameContext';

const HomeScreen = () => {
  const { startNewGame } = useGame();

  const handleStartGame = () => {
    startNewGame();
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        maxWidth: '400px',
        width: '100%',
        textAlign: 'center'
      }}>
        {/* כותרת */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          padding: '40px 30px',
          marginBottom: '30px',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '10px',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            🎯 Codenames
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.9)',
            margin: 0
          }}>
            משחק החזאים
          </p>
        </div>

        {/* הסבר המשחק */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '20px',
          marginBottom: '30px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h3 style={{
            color: 'white',
            marginBottom: '15px',
            fontSize: '18px'
          }}>
            איך לשחק:
          </h3>
          <div style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '14px',
            textAlign: 'right',
            lineHeight: '1.6'
          }}>
            <div style={{ marginBottom: '8px' }}>
              🤖 <strong>AI נותן רמזים</strong> - מקבל רמזים חכמים
            </div>
            <div style={{ marginBottom: '8px' }}>
              🎯 <strong>אתה מנחש</strong> - בוחר קלפים לפי הרמז
            </div>
            <div style={{ marginBottom: '8px' }}>
              🏆 <strong>מטרה:</strong> מצא את כל הקלפים של הקבוצה
            </div>
            <div>
              💀 <strong>זהירות:</strong> אל תיגע במתנקש השחור!
            </div>
          </div>
        </div>

        {/* כפתור התחלה */}
        <button
          onClick={handleStartGame}
          style={{
            width: '100%',
            background: 'linear-gradient(135deg, #4ade80 0%, #22c55e 100%)',
            border: 'none',
            borderRadius: '16px',
            padding: '20px',
            fontSize: '20px',
            fontWeight: 'bold',
            color: 'white',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(34, 197, 94, 0.3)',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 12px 40px rgba(34, 197, 94, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 8px 32px rgba(34, 197, 94, 0.3)';
          }}
        >
          <span style={{ fontSize: '24px' }}>🎮</span>
          התחל משחק חדש
        </button>

        {/* מידע נוסף */}
        <div style={{
          marginTop: '20px',
          fontSize: '12px',
          color: 'rgba(255, 255, 255, 0.7)',
          textAlign: 'center'
        }}>
          משחק עם AI חכם שנותן רמזים מתקדמים
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
