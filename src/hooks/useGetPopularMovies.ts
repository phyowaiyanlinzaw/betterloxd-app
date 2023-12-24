import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getPopularMovies} from '@/api/moviesApi';

export default function useGetPopularMovies() {
  const {data, error, isLoading, isError} = useQuery({
    queryKey: ['popularMovies'],
    queryFn: getPopularMovies,
  });
  return {
    popularMoviesData: data,
    error,
    isLoading,
    isError,
  };
}
