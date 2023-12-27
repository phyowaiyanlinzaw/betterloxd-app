import tmdbAxiosInstance from '@/libs/axios-config/tmdbAxiosInstance';
import {Movie} from '@/types/movieType';
import {Query, QueryFunctionContext} from '@tanstack/react-query';
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

export const getMovieDetails = async ({queryKey}: QueryFunctionContext) => {
  try {
    const [_key, movieId] = queryKey;
    const response: AxiosResponse<Movie> = await tmdbAxiosInstance.get(
      `movie/${movieId}`,
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const searchMovies = async ({queryKey}: QueryFunctionContext) => {
  try {
    const [_key, query] = queryKey;
    const response: AxiosResponse<{
      page: number;
      results: Movie[];
      total_pages: number;
      total_results: number;
    }> = await tmdbAxiosInstance.get(`search/movie?query=${query}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getUpcomingMovies = async () => {
  try {
    const response: AxiosResponse<{
      dates: {
        maximum: string;
        minimum: string;
      };
      page: number;
      results: Movie[];
      total_pages: number;
      total_results: number;
    }> = await tmdbAxiosInstance.get('movie/upcoming');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
