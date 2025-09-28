import useFetchData from '@/hooks/useFetchData';
import { fetchMovieCredits } from '@/libs/data/movies';
import { IMovieCredits } from '@/types/data';
import { MovieCredits } from '@/types/movie';

const useMovieCredits = (movieId: number): IMovieCredits => {
  const {
    data: movieCredits,
    isLoading: isLoadingCredits,
    error: creditsError,
    ...restData
  } = useFetchData<MovieCredits>({
    queryKey: ['movie-credits', `${movieId}`],
    queryFn: () => fetchMovieCredits(movieId),
    enabled: !!movieId,
  });
  return {
    movieCredits,
    isLoadingCredits,
    creditsError,
    ...restData,
  } as IMovieCredits;
};

export default useMovieCredits;
