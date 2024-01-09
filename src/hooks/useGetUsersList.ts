import {useQuery} from '@tanstack/react-query';
import {getUsersList} from '@/api/usersApi';
import {User} from '@/types/userType';

const useGetUsersList = () => {
  const {data, isLoading, isError, error} = useQuery({
    queryKey: ['users-list'],
    queryFn: getUsersList,
  });

  const usersList: User[] = data ? data : [];

  return {
    usersList: usersList,
    isLoadingUsersList: isLoading,
    isErrorUsersList: isError,
    usersListError: error,
  };
};

export default useGetUsersList;
