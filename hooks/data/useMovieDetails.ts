import useFetchData from '@/hooks/useFetchData';
import { fetchMovieDetails } from '@/libs/data/movies';
import { IMovieDetails } from '@/types/data';
import { MovieDetails } from '@/types/movie';

const useMovieDetails = (movieId: number): IMovieDetails => {
  const {
    data: movieDetails,
    isLoading: isLoadingDetails,
    error: detailsError,
    ...restData
  } = useFetchData<MovieDetails>({
    queryKey: ['movie', `${movieId}`],
    queryFn: () => fetchMovieDetails(movieId),
    enabled: !!movieId,
  });
  return {
    movieDetails,
    isLoadingDetails,
    detailsError,
    ...restData,
  } as IMovieDetails;
};

export default useMovieDetails;
