import {View, Text} from 'react-native';
import React from 'react';
import {useInfiniteQuery, useQuery} from '@tanstack/react-query';
import {getTopRatedMovies} from '@/api/moviesApi';
import {Axios, AxiosResponse} from 'axios';
import {Movie} from '@/types/movieType';
import tmdbAxiosInstance from '@/libs/axios-config/tmdbAxiosInstance';

export default function useGetTopRatedMovies() {
  // const {data, isLoading} = useQuery({
  //   queryKey: ['topRatedMovies'],
  //   queryFn: getTopRatedMovies,
  // });
  const {data, fetchNextPage, hasNextPage, isFetchingNextPage} =
    useInfiniteQuery({
      queryKey: ['topRatedMovies'],
      queryFn: async ({pageParam}) => {
        const response: AxiosResponse<{
          page: number;
          results: Movie[];
          total_pages: number;
          total_results: number;
        }> = await tmdbAxiosInstance.get('movie/top_rated', {
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
    topRatedMoviesData: data?.pages.map(page => page.movies).flat(),
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  };
}
