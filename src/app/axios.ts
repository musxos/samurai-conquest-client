import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://38.242.148.228:4002',
});

export default instance;
