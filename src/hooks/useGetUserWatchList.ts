import {View, Text} from 'react-native';
import React from 'react';
import currentUser from '@/utils/getCurrentUser';
import {getUserFavMoviesList, getUserWatchList} from '@/api/moviesApi';
import {useMutation, useQuery} from '@tanstack/react-query';
import {addToWatchList} from '@/api/usersApi';
import queryClient from '@/libs/reactquery/queryClient';

const useGetUserWatchList = () => {
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
    await addToWatchListMutation.mutateAsync(movieId);
  };
  return {
    userWatchList: data,
    handleAddToWatchList,
  };
};

export default useGetUserWatchList;
