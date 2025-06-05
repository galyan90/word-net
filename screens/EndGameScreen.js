// סיום תור
  async endTurn(roomCode, playerId) {
    return this.request(`/rooms/${roomCode}/end-turn`, {
      method: 'POST',
      body: JSON.stringify({
        playerId,
        timestamp: Date.now()
      }),
    });
  }

  // איפוס משחק
  async resetGame(roomCode, playerId) {
    return this.request(`/rooms/${roomCode}/reset`, {
      method: 'POST',
      body: JSON.stringify({
        playerId,
        timestamp: Date.now()
      }),
    });
  }

  // קבלת רשימת חדרים פעילים
  async getActiveRooms() {
    return this.request('/rooms/active');
  }

  // בדיקת קישוריות לשרת
  async healthCheck() {
    try {
      return await this.request('/health');
    } catch (error) {
      return { status: 'error', message: 'Server unavailable' };
    }
  }

  // שמירת נתוני משחק מקומי (לסטטיסטיקות)
  async saveGameStats(gameData) {
    return this.request('/stats/game', {
      method: 'POST',
      body: JSON.stringify({
        ...gameData,
        timestamp: Date.now()
      }),
    });
  }

  // קבלת סטטיסטיקות שחקן
  async getPlayerStats(playerId) {
    return this.request(`/stats/player/${playerId}`);
  }

  // דיווח על באג או בעיה
  async reportIssue(description, gameState = null) {
    return this.request('/feedback/issue', {
      method: 'POST',
      body: JSON.stringify({
        description,
        gameState,
        userAgent: navigator.userAgent,
        timestamp: Date.now()
      }),
    });
  }

  // שליחת פידבק כללי
  async sendFeedback(rating, comments) {
    return this.request('/feedback/general', {
      method: 'POST',
      body: JSON.stringify({
        rating,
        comments,
        timestamp: Date.now()
      }),
    });
  }
}

// יצירת instance יחיד של השירות
const apiService = new ApiService();

// פונקציות עזר לשימוש קל
export const gameAPI = {
  // חדרים
  createRoom: (playerName, team, role) => apiService.createRoom(playerName, team, role),
  joinRoom: (code, playerName, team, role) => apiService.joinRoom(code, playerName, team, role),
  leaveRoom: (code, playerId) => apiService.leaveRoom(code, playerId),
  getRoomInfo: (cod// services/api.js - שירותי API לתקשורת עם השרת (לעתיד)

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // פונקציה כללית לביצוע בקשות HTTP
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // יצירת חדר משחק חדש
  async createRoom(playerName, teamPreference = null, rolePreference = null) {
    return this.request('/rooms', {
      method: 'POST',
      body: JSON.stringify({
        playerName,
        teamPreference,
        rolePreference,
        timestamp: Date.now()
      }),
    });
  }

  // הצטרפות לחדר קיים
  async joinRoom(roomCode, playerName, teamPreference = null, rolePreference = null) {
    return this.request(`/rooms/${roomCode}/join`, {
      method: 'POST',
      body: JSON.stringify({
        playerName,
        teamPreference,
        rolePreference,
        timestamp: Date.now()
      }),
    });
  }

  // עזיבת חדר
  async leaveRoom(roomCode, playerId) {
    return this.request(`/rooms/${roomCode}/leave`, {
      method: 'POST',
      body: JSON.stringify({
        playerId,
        timestamp: Date.now()
      }),
    });
  }

  // קבלת מידע על חדר
  async getRoomInfo(roomCode) {
    return this.request(`/rooms/${roomCode}`);
  }

  // התחלת משחק
  async startGame(roomCode, playerId) {
    return this.request(`/rooms/${roomCode}/start`, {
      method: 'POST',
      body: JSON.stringify({
        playerId,
        timestamp: Date.now()
      }),
    });
  }

  // שליחת רמז (מנהיג)
  async sendClue(roomCode, playerId, clue, number) {
    return this.request(`/rooms/${roomCode}/clue`, {
      method: 'POST',
      body: JSON.stringify({
        playerId,
        clue,
        number,
        timestamp: Date.now()
      }),
    });
  }

  // בחירת קלף (מנחש)
  async selectCard(roomCode, playerId, cardId) {
    return this.request(`/rooms/${roomCode}/select`, {
      method: 'POST',
      body: JSON.stringify({
        playerId,
        cardId,
        timestamp: Date.now()
      }),
    });
  }

  // סיום תור
  async en
