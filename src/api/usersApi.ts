import usersAxiosInstance from '@/libs/axios-config/usersAxiosInstance';
import queryClient from '@/libs/reactquery/queryClient';
import {useAppSelector} from '@/redux/hook/hook';
import {User} from '@/types/userType';
import currentUser from '@/utils/getCurrentUser';
import {QueryFunctionContext} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';

export const getUsersList = async () => {
  try {
    const response: AxiosResponse<User[]> = await usersAxiosInstance.get('');
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

interface AddToSmthParams {
  movieId: number;
  userId: number;
}

export const addToFav = async ({movieId, userId}: AddToSmthParams) => {
  try {
    const userToUpdate: AxiosResponse<User> = await usersAxiosInstance.get(
      `/${userId}`,
    );

    const updatedData = {
      ...userToUpdate.data,
      favs: [...userToUpdate.data.favs, movieId],
    };

    const response: AxiosResponse<User> = await usersAxiosInstance.patch(
      `/${userId}`,
      updatedData,
    );

    // queryClient.invalidateQueries(queryKey);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const addToWatchList = async ({userId, movieId}: AddToSmthParams) => {
  try {
    const userToUpdate: AxiosResponse<User> = await usersAxiosInstance.get(
      `/${userId}`,
    );

    const updatedData = {
      ...userToUpdate.data,
      watchlist: [...userToUpdate.data.watchlist, movieId],
    };

    const response: AxiosResponse<User> = await usersAxiosInstance.patch(
      `/${currentUser.id}`,
      updatedData,
    );

    // queryClient.invalidateQueries(queryKey);

    return response.data;
  } catch (err) {
    console.log(err);
  }
};
export const getUser = async ({queryKey}: QueryFunctionContext) => {
  try {
    const [_key, userId] = queryKey;
    const response: AxiosResponse<User> = await usersAxiosInstance.get(
      `/${userId}`,
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const getCurrentUser = async ({queryKey}: QueryFunctionContext) => {
  try {
    const [_key, userId] = queryKey;
    const response: AxiosResponse<User> = await usersAxiosInstance.get(
      `/${userId}`,
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const registerUser = async (user: User) => {
  try {
    const response: AxiosResponse<User> = await usersAxiosInstance.post(
      '',
      user,
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
