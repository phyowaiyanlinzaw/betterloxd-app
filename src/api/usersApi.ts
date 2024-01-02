import usersAxiosInstance from '@/libs/axios-config/usersAxiosInstance';
import {User} from '@/types/userType';
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