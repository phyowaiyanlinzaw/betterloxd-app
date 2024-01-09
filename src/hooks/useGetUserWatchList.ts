import {View, Text} from 'react-native';
import React from 'react';
import {getUserFavMoviesList, getUserWatchList} from '@/api/moviesApi';
import {useMutation, useQuery} from '@tanstack/react-query';
import {addToWatchList, removeFromWatchList} from '@/api/usersApi';
import queryClient from '@/libs/reactquery/queryClient';
import {useAppSelector} from '@/redux/hook/hook';

const useGetUserWatchList = () => {
  const currentUser = useAppSelector(state => state.user.user);
  const {data} = useQuery({
    queryKey: ['user-watch-list', currentUser.id],
    queryFn: getUserWatchList,
  });

  const addToWatchListMutation = useMutation({
    mutationFn: addToWatchList,
    mutationKey: ['add-to-watch-list'],
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['user-watch-list', currentUser.id],
      });
    },
  });

  const handleAddToWatchList = async (movieId: number) => {
    await addToWatchListMutation.mutateAsync({
      movieId,
      userId: currentUser.id,
    });
  };

  const removeFromWatchListMutation = useMutation({
    mutationFn: removeFromWatchList,
    mutationKey: ['remove-from-watch-list'],
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['user-watch-list', currentUser.id],
      });
    },
  });

  const handleRemoveFromWatchList = async (movieId: number) => {
    await removeFromWatchListMutation.mutateAsync({
      movieId,
      userId: currentUser.id,
    });
  };

  return {
    userWatchList: data,
    handleAddToWatchList,
    handleRemoveFromWatchList,
  };
};

export default useGetUserWatchList;
