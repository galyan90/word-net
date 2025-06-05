// state/reducer.js - ניהול מצב המשחק

export const initialState = {
  screen: 'home',
  board: [],
  currentTeam: 'red',
  phase: 'spymaster', // 'spymaster' or 'guessing'
  score: { red: 9, blue: 8 },
  clue: { word: '', number: 0 },
  guessesLeft: 0,
  revealed: new Set(),
  winner: null,
  feedback: null
};

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SET_SCREEN':
      return { 
        ...state, 
        screen: action.payload 
      };

    case 'INIT_GAME':
      return { 
        ...state, 
        ...action.payload,
        screen: 'game',
        revealed: new Set(action.payload.revealed || [])
      };

    case 'SET_CLUE':
      return { 
        ...state, 
        clue: action.payload.clue,
        guessesLeft: action.payload.guessesLeft,
        phase: 'guessing'
      };

    case 'SELECT_CARD':
      const newRevealed = new Set([...state.revealed, action.payload.cardId]);
      const card = state.board.find(c => c.id === action.payload.cardId);
      
      let newState = {
        ...state,
        revealed: newRevealed,
        guessesLeft: state.guessesLeft - 1,
        feedback: action.payload.feedback
      };

      // עדכון ניקוד
      if (card.type === state.currentTeam) {
        newState.score = {
          ...state.score,
          [state.currentTeam]: state.score[state.currentTeam] - 1
        };
      } else if (card.type !== 'neutral' && card.type !== 'assassin') {
        const opponent = state.currentTeam === 'red' ? 'blue' : 'red';
        newState.score = {
          ...state.score,
          [opponent]: state.score[opponent] - 1
        };
      }

      // בדיקת ניצחון
      if (card.type === 'assassin') {
        newState.winner = state.currentTeam === 'red' ? 'blue' : 'red';
        newState.screen = 'end';
      } else if (newState.score[state.currentTeam] <= 0) {
        newState.winner = state.currentTeam;
        newState.screen = 'end';
      } else if (card.type !== 'neutral' && card.type !== state.currentTeam) {
        const opponent = state.currentTeam === 'red' ? 'blue' : 'red';
        if (newState.score[opponent] <= 0) {
          newState.winner = opponent;
          newState.screen = 'end';
        }
      }

      return newState;

    case 'END_TURN':
      return {
        ...state,
        currentTeam: state.currentTeam === 'red' ? 'blue' : 'red',
        phase: 'spymaster',
        clue: { word: '', number: 0 },
        guessesLeft: 0,
        feedback: null
      };

    case 'SET_FEEDBACK':
      return {
        ...state,
        feedback: action.payload
      };

    case 'CLEAR_FEEDBACK':
      return {
        ...state,
        feedback: null
      };

    case 'SET_WINNER':
      return {
        ...state,
        winner: action.payload,
        screen: 'end'
      };

    case 'RESET_GAME':
      return {
        ...initialState,
        screen: 'home'
      };

    default:
      return state;
  }
};

export default gameReducer;
