import {View, Text} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {getMovieDetails, getUserFavMoviesList} from '@/api/moviesApi';
import currentUser from '@/utils/getCurrentUser';
import {Movie} from '@/types/movieType';
import useGetUser from './useGetUser';

const useGetUserFavMovies = () => {
  const {data, refetch} = useQuery({
    queryKey: ['user-fav-movies', currentUser.id],
    queryFn: getUserFavMoviesList,
  });

  return {
    userFavMovies: data,
    refetchFavs: refetch,
  };
};

export default useGetUserFavMovies;
