import useFetchData from '@/hooks/useFetchData';
import { fetchUpcomingMovies } from '@/libs/data/movies';
import { IUpcomingMovies } from '@/types/data';
import { Movie } from '@/types/movie';

const useUpcomingMovies = (): IUpcomingMovies => {
  const {
    data: upcomingMovies = [],
    isLoading: isLoadingUpcoming,
    error: upcomingError,
    ...restData
  } = useFetchData<Movie[]>({
    queryKey: ['movies', 'upcoming'],
    queryFn: () => fetchUpcomingMovies(1),
  });
  return {
    upcomingMovies,
    isLoadingUpcoming,
    upcomingError,
    ...restData,
  } as IUpcomingMovies;
};

export default useUpcomingMovies;
