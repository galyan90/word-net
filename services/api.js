import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

export const createGame = async () => {
  const res = await axios.post(`${API_BASE}/game/create`);
  return res.data;
};
