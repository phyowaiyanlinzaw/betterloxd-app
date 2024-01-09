import {useMutation, useQuery} from '@tanstack/react-query';
import {getUserFavMoviesList} from '@/api/moviesApi';
import {addToFav, removeFromFav} from '@/api/usersApi';
import queryClient from '@/libs/reactquery/queryClient';
import {useAppSelector} from '@/redux/hook/hook';
import {User} from '@/types/userType';

const useGetUserFavMovies = (currentUser: User) => {
  const {data, refetch} = useQuery({
    queryKey: ['user-fav-movies', currentUser.id],
    queryFn: getUserFavMoviesList,
  });

  const {mutateAsync} = useMutation({
    mutationKey: ['add-to-fav'],
    mutationFn: removeFromFav,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['user-fav-movies', currentUser.id],
      });
    },
  });

  const handleAddToFav = async (movieId: number) => {
    await mutateAsync({
      movieId,
      userId: currentUser.id,
    });
  };

  const removeFromFavMutate = useMutation({
    mutationKey: ['remove-from-fav'],
    mutationFn: addToFav,
    onSuccess: () => {
      return queryClient.invalidateQueries({
        queryKey: ['user-fav-movies', currentUser.id],
      });
    },
  });

  const handleRemoveFromFav = async (movieId: number) => {
    await removeFromFavMutate.mutateAsync({
      movieId,
      userId: currentUser.id,
    });
  };

  return {
    userFavMovies: data,
    refetchFavs: refetch,
    handleAddToFav,
    handleRemoveFromFav,
  };
};

export default useGetUserFavMovies;
