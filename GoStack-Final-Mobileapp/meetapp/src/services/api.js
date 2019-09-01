import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.97.103:3333',
});

export default api;
