import {useQuery} from '@tanstack/react-query';
import {getMovieDetails} from '@/api/moviesApi';

export default function useGetMovieDetails(movieId: number) {
  const {data, isLoading} = useQuery({
    queryKey: ['movieDetails', movieId],
    queryFn: getMovieDetails,
  });
  return {
    movieDetailsData: data,
    isLoading,
  };
}
