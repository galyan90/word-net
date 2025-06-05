// hooks/useSocket.js - Hook לניהול חיבור WebSocket (לעתיד)

import { useState, useEffect, useRef, useCallback } from 'react';

const SOCKET_URL = process.env.REACT_APP_SOCKET_URL || 'ws://localhost:3001';

export const useSocket = (roomCode = null) => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectionError, setConnectionError] = useState(null);
  const [lastMessage, setLastMessage] = useState(null);
  const reconnectTimeoutRef = useRef(null);
  const reconnectAttemptsRef = useRef(0);
  const maxReconnectAttempts = 5;

  // פונקציה ליצירת חיבור WebSocket
  const connect = useCallback(() => {
    try {
      const wsUrl = roomCode ? `${SOCKET_URL}?room=${roomCode}` : SOCKET_URL;
      const ws = new WebSocket(wsUrl);
      
      ws.onopen = () => {
        console.log('WebSocket connected');
        setIsConnected(true);
        setConnectionError(null);
        reconnectAttemptsRef.current = 0;
        
        // שליחת הודעת אימות ראשונית
        ws.send(JSON.stringify({
          type: 'AUTH',
          roomCode,
          timestamp: Date.now()
        }));
      };

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          setLastMessage(message);
          console.log('WebSocket message received:', message);
        } catch (error) {
          console.error('Failed to parse WebSocket message:', error);
        }
      };

      ws.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason);
        setIsConnected(false);
        setSocket(null);
        
        // ניסיון התחברות מחדש (אם לא נסגר בכוונה)
        if (event.code !== 1000 && reconnectAttemptsRef.current < maxReconnectAttempts) {
          const delay = Math.pow(2, reconnectAttemptsRef.current) * 1000; // Exponential backoff
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttemptsRef.current++;
            console.log(`Reconnect attempt ${reconnectAttemptsRef.current}/${maxReconnectAttempts}`);
            connect();
          }, delay);
        }
      };

      ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        setConnectionError('שגיאת חיבור לשרת');
      };

      setSocket(ws);
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error);
      setConnectionError('לא ניתן להתחבר לשרת');
    }
  }, [roomCode]);

  // ניתוק מהשרת
  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current);
    }
    
    if (socket) {
      socket.close(1000, 'User disconnected');
    }
    
    setSocket(null);
    setIsConnected(false);
    setConnectionError(null);
    reconnectAttemptsRef.current = 0;
  }, [socket]);

  // שליחת הודעה
  const sendMessage = useCallback((message) => {
    if (socket && isConnected) {
      const messageWithTimestamp = {
        ...message,
        timestamp: Date.now()
      };
      
      try {
        socket.send(JSON.stringify(messageWithTimestamp));
        return true;
      } catch (error) {
        console.error('Failed to send WebSocket message:', error);
        setConnectionError('שגיאה בשליחת הודעה');
        return false;
      }
    } else {
      console.warn('Cannot send message: socket not connected');
      return false;
    }
  }, [socket, isConnected]);

  // פונקציות משחק ספציפיות
  const gameActions = {
    // הצטרפות לחדר
    joinRoom: (playerName, teamPreference, rolePreference) => 
      sendMessage({
        type: 'JOIN_ROOM',
        playerName,
        teamPreference,
        rolePreference
      }),

    // עזיבת חדר
    leaveRoom: () => 
      sendMessage({
        type: 'LEAVE_ROOM'
      }),

    // התחלת משחק
    startGame: () => 
      sendMessage({
        type: 'START_GAME'
      }),

    // שליחת רמז
    sendClue: (clue, number) => 
      sendMessage({
        type: 'SEND_CLUE',
        clue,
        number
      }),

    // בחירת קלף
    selectCard: (cardId) => 
      sendMessage({
        type: 'SELECT_CARD',
        cardId
      }),

    // סיום תור
    endTurn: () => 
      sendMessage({
        type: 'END_TURN'
      }),

    // איפוס משחק
    resetGame: () => 
      sendMessage({
        type: 'RESET_GAME'
      }),

    // שליחת הודעת צ'אט
    sendChatMessage: (message) => 
      sendMessage({
        type: 'CHAT_MESSAGE',
        message
      })
  };

  // התחברות אוטומטית
  useEffect(() => {
    connect();
    
    // ניקוי בעת הרס הקומפוננט
    return () => {
      disconnect();
    };
  }, [connect, disconnect]);

  // ניקוי timeout בעת הרס
  useEffect(() => {
    return () => {
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  return {
    // מצב החיבור
    isConnected,
    connectionError,
    lastMessage,
    
    // פעולות בסיסיות
    connect,
    disconnect,
    sendMessage,
    
    // פעולות משחק
    ...gameActions,
    
    // מידע נוסף
    reconnectAttempts: reconnectAttemptsRef.current,
    maxReconnectAttempts
  };
};

export default useSocket;
