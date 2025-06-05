export default function reducer(state, action) {
  switch (action.type) {
    case 'SET_GAME_ID':
      return { ...state, gameId: action.payload };
    case 'SET_PLAYERS':
      return { ...state, players: action.payload };
    default:
      return state;
  }
}
