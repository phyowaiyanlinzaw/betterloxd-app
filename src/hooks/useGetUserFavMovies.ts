import {View, Text} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {getMovieDetails, getUserFavMoviesList} from '@/api/moviesApi';
import currentUser from '@/utils/getCurrentUser';
import {Movie} from '@/types/movieType';

const useGetUserFavMovies = () => {
  const favMovies: number[] = currentUser.favs;
  const {data} = useQuery({
    queryKey: ['user-fav-movies', favMovies],
    queryFn: getUserFavMoviesList,
  });

  return {
    userFavMovies: data,
  };
};

export default useGetUserFavMovies;
