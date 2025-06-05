// state/reducer.js - לוגיקת עדכון המצב
export const initialState = {
  screen: 'home',
  board: [],
  currentTeam: 'red',
  phase: 'spymaster',
  score: { red: 9, blue: 8 },
  clue: { word: '', number: 0 },
  guessesLeft: 0,
  revealed: new Set(),
  winner: null
};

const gameReducer = (state, action) => {
  switch(action.type) {
    case 'SET_SCREEN':
      return { ...state, screen: action.payload };
    case 'INIT_GAME':
      return { ...state, ...action.payload };
    case 'SELECT_CARD':
      return { ...state, revealed: new Set([...state.revealed, action.payload]) };
    // ... עוד actions
    default:
      return state;
  }
};

export default gameReducer;
