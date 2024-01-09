import {useInfiniteQuery} from '@tanstack/react-query';
import tmdbAxiosInstance from '@/libs/axios-config/tmdbAxiosInstance';
import {Movie} from '@/types/movieType';
import {AxiosResponse} from 'axios';

export default function useGetPopularMovies() {
  const {data, isFetchingNextPage, hasNextPage, fetchNextPage} =
    useInfiniteQuery({
      queryKey: ['popularMovies'],
      queryFn: async ({pageParam}) => {
        const response: AxiosResponse<{
          page: number;
          results: Movie[];
          total_pages: number;
          total_results: number;
        }> = await tmdbAxiosInstance.get('movie/popular', {
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
    popularMoviesData: data?.pages.map(page => page.movies).flat(),
    isFetchingNextPagePopularMovies: isFetchingNextPage,
    hasNextPagePopularMovies: hasNextPage,
    fetchNextPagePopularMovies: fetchNextPage,
  };
}
