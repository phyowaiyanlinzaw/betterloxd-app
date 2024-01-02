import usersAxiosInstance from '@/libs/axios-config/usersAxiosInstance';
import {User} from '@/types/userType';
import currentUser from '@/utils/getCurrentUser';
import {QueryFunctionContext} from '@tanstack/react-query';
import {AxiosResponse} from 'axios';

type ResponseModel = {
  jsonStringResponse: string;
};

export const getUsersList = async () => {
  try {
    const response: AxiosResponse<User[]> = await usersAxiosInstance.get('');
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const addToFav = async (movieId: number) => {
  try {
    const response: AxiosResponse<User> = await usersAxiosInstance.patch(
      `/${currentUser.id}`,
      {
        favs: [...currentUser.favs, movieId],
      },
    );
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
