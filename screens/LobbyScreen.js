// screens/LobbyScreen.js - מסך המתנה לרב-משתתפים (לעתיד)

import React, { useState } from 'react';
import { useGame } from '../state/GameContext';

const LobbyScreen = () => {
  const { setScreen, startNewGame } = useGame();
  const [roomCode, setRoomCode] = useState('');
  const [playerName, setPlayerName] = useState('');
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedRole, setSelectedRole] = useState('');

  const handleJoinRoom = () => {
    if (!roomCode.trim() || !playerName.trim()) {
      alert('אנא הכנס קוד חדר ושם שחקן');
      return;
    }
    
    // כאן יהיה חיבור לשרת (לעתיד)
    console.log('Joining room:', { roomCode, playerName, selectedTeam, selectedRole });
    
    // לעת עתה - מתחיל משחק מקומי
    startNewGame();
  };

  const handleCreateRoom = () => {
    if (!playerName.trim()) {
      alert('אנא הכנס שם שחקן');
      return;
    }
    
    // כאן יהיה יצירת חדר בשרת (לעתיד)
    const newRoomCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    console.log('Creating room:', { roomCode: newRoomCode, playerName });
    
    // לעת עתה - מתחיל משחק מקומי
    startNewGame();
  };

  const handleGoBack = () => {
    setScreen('home');
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
        maxWidth: '500px',
        width: '100%'
      }}>
        
        {/* כותרת */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: '20px',
          padding: '30px',
          marginBottom: '30px',
          textAlign: 'center',
          border: '1px solid rgba(255, 255, 255, 0.3)'
        }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: 'white',
            marginBottom: '10px'
          }}>
            🌐 חדר רב-משתתפים
          </h1>
          <p style={{
            color: 'rgba(255, 255, 255, 0.9)',
            margin: 0
          }}>
            הצטרף או צור חדר משחק חדש
          </p>
        </div>

        {/* פרטי שחקן */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '20px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h3 style={{
            color: 'white',
            marginBottom: '16px',
            fontSize: '18px'
          }}>
            פרטי שחקן:
          </h3>
          
          <input
            type="text"
            placeholder="שם השחקן"
            value={playerName}
            onChange={(e) => setPlayerName(e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '8px',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.9)',
              fontSize: '16px',
              textAlign: 'right',
              marginBottom: '16px'
            }}
            dir="rtl"
          />

          {/* בחירת קבוצה */}
          <div style={{ marginBottom: '16px' }}>
            <div style={{
              color: 'white',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              בחר קבוצה:
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setSelectedTeam('red')}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: selectedTeam === 'red' ? '3px solid #ef4444' : '2px solid rgba(255, 255, 255, 0.3)',
                  background: selectedTeam === 'red' ? '#ef4444' : 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                🔴 אדום
              </button>
              <button
                onClick={() => setSelectedTeam('blue')}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: selectedTeam === 'blue' ? '3px solid #3b82f6' : '2px solid rgba(255, 255, 255, 0.3)',
                  background: selectedTeam === 'blue' ? '#3b82f6' : 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                🔵 כחול
              </button>
            </div>
          </div>

          {/* בחירת תפקיד */}
          <div>
            <div style={{
              color: 'white',
              marginBottom: '8px',
              fontSize: '14px'
            }}>
              בחר תפקיד:
            </div>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button
                onClick={() => setSelectedRole('spymaster')}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: selectedRole === 'spymaster' ? '3px solid #f59e0b' : '2px solid rgba(255, 255, 255, 0.3)',
                  background: selectedRole === 'spymaster' ? '#f59e0b' : 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                👑 מנהיג
              </button>
              <button
                onClick={() => setSelectedRole('guesser')}
                style={{
                  flex: 1,
                  padding: '12px',
                  borderRadius: '8px',
                  border: selectedRole === 'guesser' ? '3px solid #10b981' : '2px solid rgba(255, 255, 255, 0.3)',
                  background: selectedRole === 'guesser' ? '#10b981' : 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                🎯 מנחש
              </button>
            </div>
          </div>
        </div>

        {/* הצטרפות לחדר */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '20px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h3 style={{
            color: 'white',
            marginBottom: '16px',
            fontSize: '18px'
          }}>
            הצטרף לחדר קיים:
          </h3>
          
          <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
            <input
              type="text"
              placeholder="קוד החדר"
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
              style={{
                flex: 1,
                padding: '12px 16px',
                borderRadius: '8px',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.9)',
                fontSize: '16px',
                textAlign: 'center',
                fontWeight: 'bold',
                letterSpacing: '2px'
              }}
              maxLength={6}
            />
            <button
              onClick={handleJoinRoom}
              style={{
                padding: '12px 24px',
                borderRadius: '8px',
                border: 'none',
                background: '#22c55e',
                color: 'white',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              הצטרף
            </button>
          </div>
        </div>

        {/* יצירת חדר חדש */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '20px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <button
            onClick={handleCreateRoom}
            style={{
              width: '100%',
              padding: '16px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
              color: 'white',
              fontSize: '18px',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            ➕ צור חדר חדש
          </button>
        </div>

        {/* כפתור חזרה */}
        <button
          onClick={handleGoBack}
          style={{
            width: '100%',
            padding: '12px',
            borderRadius: '12px',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            background: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          ← חזרה
        </button>

        {/* הודעה על מצב הפיתוח */}
        <div style={{
          marginTop: '20px',
          padding: '16px',
          background: 'rgba(255, 193, 7, 0.2)',
          border: '2px solid rgba(255, 193, 7, 0.5)',
          borderRadius: '12px',
          textAlign: 'center'
        }}>
          <div style={{
            color: '#ffc107',
            fontSize: '14px',
            fontWeight: 'bold',
            marginBottom: '8px'
          }}>
            🚧 בפיתוח
          </div>
          <div style={{
            color: 'rgba(255, 255, 255, 0.9)',
            fontSize: '12px',
            lineHeight: '1.4'
          }}>
            מצב רב-משתתפים נמצא בפיתוח.
            <br />
            כרגע מפעיל משחק מקומי.
          </div>
        </div>
      </div>
    </div>
  );
};

export default LobbyScreen;
