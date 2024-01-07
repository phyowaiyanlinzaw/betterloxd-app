import tmdbAxiosInstance from '@/libs/axios-config/tmdbAxiosInstance';
import usersAxiosInstance from '@/libs/axios-config/usersAxiosInstance';
import {Movie} from '@/types/movieType';
import {User} from '@/types/userType';
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

export const getTopRatedMovies = async (page: number) => {
  try {
    const response: AxiosResponse<{
      page: number;
      results: Movie[];
      total_pages: number;
      total_results: number;
    }> = await tmdbAxiosInstance.get('movie/top_rated', {params: {page}});
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

export const getUserFavMoviesList = async ({
  queryKey,
}: QueryFunctionContext) => {
  try {
    const [_key, userId] = queryKey;
    const user: AxiosResponse<User> = await usersAxiosInstance.get(
      `/${userId}`,
    );

    const favMovies: number[] = user.data.favs;

    const result: Movie[] = [];
    const fetchFavMovies = async () => {
      for (const movieId of favMovies) {
        const response: AxiosResponse<Movie> = await tmdbAxiosInstance.get(
          `movie/${movieId}`,
        );
        result.push(response.data);
      }
    };
    await fetchFavMovies();
    return result;
  } catch (error) {
    console.log(error);
  }
};

export const getUserWatchList = async ({queryKey}: QueryFunctionContext) => {
  try {
    const [_key, userId] = queryKey;
    const user: AxiosResponse<User> = await usersAxiosInstance.get(
      `/${userId}`,
    );
    const watchList: number[] = user.data.watchlist;
    const result: Movie[] = [];
    const fetchWatchList = async () => {
      for (const movieId of watchList) {
        const response: AxiosResponse<Movie> = await tmdbAxiosInstance.get(
          `movie/${movieId}`,
        );
        result.push(response.data);
      }
    };
    await fetchWatchList();
    return result;
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
