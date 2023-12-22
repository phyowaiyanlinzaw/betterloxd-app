import tmdbAxiosInstance from '@/libs/axios-config/tmdbAxiosInstance';

export const getPopularMovies = async () => {
  try {
    const response = await tmdbAxiosInstance.get('movie/popular');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
