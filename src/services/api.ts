import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.104:3333',
});

export { api };

// baseURL: 'http://192.168.1.108:3333' 192.168.1.104
