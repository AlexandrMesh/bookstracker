import axios from 'axios';

const http = axios.create({
  baseURL: 'http://10.140.133.245:3000',
  headers: { 'Content-Type': 'application/json' },
});

export default http;
