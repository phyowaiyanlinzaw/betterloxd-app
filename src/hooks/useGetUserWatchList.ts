import {getUserWatchList} from '@/api/moviesApi';
import {useMutation, useQuery} from '@tanstack/react-query';
import {addToWatchList, removeFromWatchList} from '@/api/usersApi';
import queryClient from '@/libs/reactquery/queryClient';
import {storage} from '@/db/storage';

const currentStringUser = storage.getString('currentUser');
const currentUser = currentStringUser ? JSON.parse(currentStringUser) : null;

const useGetUserWatchList = () => {
  console.log('currentUser', currentUser);
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

    console.log('movieId', movieId);
    console.log('currentUser.id', currentUser.id);
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
