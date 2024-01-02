import {View, Text} from 'react-native';
import React from 'react';
import currentUser from '@/utils/getCurrentUser';
import {getUserFavMoviesList, getUserWatchList} from '@/api/moviesApi';
import {useQuery} from '@tanstack/react-query';

const useGetUserWatchList = () => {
  const watchList: number[] = currentUser.watchlist;
  const {data} = useQuery({
    queryKey: ['user-fav-movies', watchList],
    queryFn: getUserWatchList,
  });
  return {
    userWatchList: data,
  };
};

export default useGetUserWatchList;
