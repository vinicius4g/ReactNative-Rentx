import axios from 'axios';

const api = axios.create({
    baseURL: 'http://192.168.0.152:3001'
   
})

export { api };

// baseURL: 'http://192.168.1.108:3333'