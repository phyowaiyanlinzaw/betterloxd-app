import axiosInstance from '../libs/axiosInstance';

export const getPopularMovies = async () => {
  try {
    const response = await axiosInstance.get('movie/popular');
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
