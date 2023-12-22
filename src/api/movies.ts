import tmdbAxiosInstance from '@/libs/axios-config/tmdbAxiosInstance';
import {Movie} from '@/types/movieType';
import {AxiosResponse} from 'axios';

export const getPopularMovies = async () => {
  try {
    const response: AxiosResponse<{
      page: number;
      results: Movie[];
      total_pages: number;
      total_results: number;
    }> = await tmdbAxiosInstance.get('movie/popular');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getTopRatedMovies = async () => {
  try {
    const response: AxiosResponse<{
      page: number;
      results: Movie[];
      total_pages: number;
      total_results: number;
    }> = await tmdbAxiosInstance.get('movie/top_rated');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
