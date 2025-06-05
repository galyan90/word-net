// components/PlayerList.js - רכיב רשימת שחקנים

import React from 'react';
import { useGame } from '../state/GameContext';
import { TEAM_COLORS } from '../constants/colors';

const PlayerList = () => {
  const { gameState } = useGame();

  const getCurrentTeamInfo = () => {
    const teamName = gameState.currentTeam === 'red' ? 'אדום' : 'כחול';
    const phaseName = gameState.phase === 'spymaster' ? 'AI מנהיג' : 'אתה מנחש';
    return { teamName, phaseName };
  };

  const { teamName, phaseName } = getCurrentTeamInfo();

  return (
    <div 
      className="player-list"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 20px',
        backgroundColor: 'white',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        margin: '20px 0'
      }}
    >
      {/* מידע על התור הנוכחי */}
      <div 
        style={{
          padding: '10px 20px',
          borderRadius: '20px',
          backgroundColor: gameState.currentTeam === 'red' ? '#ffebee' : '#e3f2fd',
          border: `2px solid ${TEAM_COLORS[gameState.currentTeam]}`,
          color: gameState.currentTeam === 'red' ? '#c62828' : '#1565c0'
        }}
      >
        <span style={{ fontWeight: 'bold', fontSize: '16px' }}>
          תור: {teamName} ({phaseName})
        </span>
      </div>

      {/* ניקוד */}
      <div style={{ 
        fontSize: '24px', 
        fontWeight: 'bold',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <span style={{ color: TEAM_COLORS.red }}>
          {gameState.score.red}
        </span>
        <span style={{ color: '#666' }}>:</span>
        <span style={{ color: TEAM_COLORS.blue }}>
          {gameState.score.blue}
        </span>
      </div>

      {/* מידע נוסף */}
      <div style={{ 
        fontSize: '14px', 
        color: '#666',
        textAlign: 'right'
      }}>
        <div>🔴 אדום: {gameState.score.red} קלפים</div>
        <div>🔵 כחול: {gameState.score.blue} קלפים</div>
      </div>
    </div>
  );
};

export default PlayerList;
