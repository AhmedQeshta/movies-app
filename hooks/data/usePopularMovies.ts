import useFetchData from '@/hooks/useFetchData';
import { fetchMovies } from '@/libs/data/movies';
import { IPopularMovies } from '@/types/data';
import { Movie } from '@/types/movie';

const usePopularMovies = (): IPopularMovies => {
  const {
    data: popularMovies = [],
    isLoading: isLoadingPopular,
    error: popularError,
    ...restData
  } = useFetchData<Movie[]>({
    queryKey: ['movies', 'popular'],
    queryFn: () => fetchMovies(1),
  });
  return {
    popularMovies,
    isLoadingPopular,
    popularError,
    ...restData,
  } as IPopularMovies;
};

export default usePopularMovies;
