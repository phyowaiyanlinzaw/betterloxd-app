import {View, Text} from 'react-native';
import React from 'react';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {getUpcomingMovies} from '@/api/moviesApi';
import tmdbAxiosInstance from '@/libs/axios-config/tmdbAxiosInstance';
import {Movie} from '@/types/movieType';
import {AxiosResponse} from 'axios';

const useGetUpcomingMovies = () => {
  const {data, isFetchingNextPage, fetchNextPage, hasNextPage} =
    useInfiniteQuery({
      queryKey: ['upcomingMovies'],
      queryFn: async ({pageParam}) => {
        const response: AxiosResponse<{
          dates: {
            maximum: string;
            minimum: string;
          };
          page: number;
          results: Movie[];
          total_pages: number;
          total_results: number;
        }> = await tmdbAxiosInstance.get('movie/upcoming', {
          params: {
            page: pageParam,
          },
        });
        let currentPage = response.data.page;
        let totalPages = response.data.total_pages;
        let nextPage = currentPage < totalPages ? currentPage + 1 : null;
        let movies = response.data.results;
        return {
          nextPage,
          movies,
        };
      },
      initialPageParam: 1,
      getNextPageParam: lastPage => lastPage.nextPage,
    });
  return {
    upcomingMoviesData: data?.pages.map(page => page.movies).flat(),
    isFetchingNextPageUpcomingMovies: isFetchingNextPage,
    hasNextPageUpcomingMovies: hasNextPage,
    fetchNextPageUpcomingMovies: fetchNextPage,
  };
};

export default useGetUpcomingMovies;
