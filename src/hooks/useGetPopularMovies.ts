import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {useQuery} from '@tanstack/react-query';
import {getPopularMovies} from '@/api/movies';

export default function useGetPopularMovies() {
  const {data, error, isLoading, isError} = useQuery({
    queryKey: ['popularMovies'],
    queryFn: getPopularMovies,
  });
  return {
    data,
    error,
    isLoading,
    isError,
  };
}
