import axios from 'axios';

const tmdbAxiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3/',
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MDY2YmUxYjEzYTVkZjM5NDA3ZDlmNTgzZDU3OWQ1ZCIsInN1YiI6IjYzOWQ0MmNiOWJjZDBmMDA4YzUxYWFjNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.885dfzBlsRrx43OUWHaTqduAgiGGWup3fm2PSjcnjZw',
  },
  timeout: 90000,
  timeoutErrorMessage: 'Request timed out',
});

export default tmdbAxiosInstance;
