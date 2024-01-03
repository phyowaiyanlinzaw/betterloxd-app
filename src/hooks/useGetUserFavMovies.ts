import {View, Text} from 'react-native';
import React from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {getMovieDetails, getUserFavMoviesList} from '@/api/moviesApi';
import currentUser from '@/utils/getCurrentUser';
import {Movie} from '@/types/movieType';
import useGetUser from './useGetUser';
import {addToFav} from '@/api/usersApi';
import queryClient from '@/libs/reactquery/queryClient';

const useGetUserFavMovies = () => {
  const {data, refetch} = useQuery({
    queryKey: ['user-fav-movies', currentUser.id],
    queryFn: getUserFavMoviesList,
  });

  const {mutateAsync} = useMutation({
    mutationKey: ['add-to-fav'],
    mutationFn: addToFav,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['user-fav-movies', currentUser.id],
      });
    },
  });

  const handleAddToFav = async (movieId: number) => {
    await mutateAsync(movieId);
  };

  return {
    userFavMovies: data,
    refetchFavs: refetch,
    handleAddToFav,
  };
};

export default useGetUserFavMovies;
