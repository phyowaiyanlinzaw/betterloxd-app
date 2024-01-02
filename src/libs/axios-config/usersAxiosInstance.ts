import axios from 'axios';

const usersAxiosInstance = axios.create({
  baseURL: 'http://localhost:3000/users',
  timeout: 90000,
  timeoutErrorMessage: 'Request timed out',
});

export default usersAxiosInstance;
