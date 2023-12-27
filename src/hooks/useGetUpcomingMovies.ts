import {View, Text} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {getUpcomingMovies} from '@/api/moviesApi';

const useGetUpcomingMovies = () => {
  const {data} = useQuery({
    queryKey: ['upcomingMovies'],
    queryFn: getUpcomingMovies,
  });
  return {
    upcomingMoviesData: data,
  };
};

export default useGetUpcomingMovies;
