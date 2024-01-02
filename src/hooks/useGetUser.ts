import {View, Text} from 'react-native';
import React from 'react';
import {useQuery} from '@tanstack/react-query';
import {getUser} from '@/api/usersApi';

const useGetUser = (id: number) => {
  const {data} = useQuery({
    queryKey: ['user', id],
    queryFn: getUser,
  });
  return {
    user: data,
  };
};

export default useGetUser;
