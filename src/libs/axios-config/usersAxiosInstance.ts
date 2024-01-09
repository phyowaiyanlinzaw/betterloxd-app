import axios from 'axios';

const usersAxiosInstance = axios.create({
  baseURL: 'https://2hh89s09-3000.inc1.devtunnels.ms/users',
  timeout: 90000,
  timeoutErrorMessage: 'Request timed out',
});

export default usersAxiosInstance;
