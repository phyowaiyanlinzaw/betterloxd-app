import {View, Text} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {getTopRatedMovies} from '@/api/movies';

export default function useGetTopRatedMovies() {
  const {data, isLoading} = useQuery({
    queryKey: ['topRatedMovies'],
    queryFn: getTopRatedMovies,
  });
  return {
    topRatedMoviesData: data,
    isLoading,
  };
}
