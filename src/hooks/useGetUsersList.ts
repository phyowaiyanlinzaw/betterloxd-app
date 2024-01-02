import {View, Text} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {getUsersList} from '@/api/usersApi';

const useGetUsersList = () => {
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['users-list'],
    queryFn: getUsersList,
  });
  return {
    usersList: data,
    isLoadingUsersList: isLoading,
    isErrorUsersList: isError,
    usersListError: error,
  };
};

export default useGetUsersList;
