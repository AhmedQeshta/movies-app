import useFetchData from '@/hooks/useFetchData';
import { fetchTopRatedMovies } from '@/libs/data/movies';
import { ITopRatedMovies } from '@/types/data';
import { Movie } from '@/types/movie';

const useTopRatedMovies = (): ITopRatedMovies => {
  const {
    data: topRatedMovies = [],
    isLoading: isLoadingTopRated,
    error: topRatedError,
    ...restData
  } = useFetchData<Movie[]>({
    queryKey: ['movies', 'top-rated'],
    queryFn: () => fetchTopRatedMovies(1),
  });
  return {
    topRatedMovies,
    isLoadingTopRated,
    topRatedError,
    ...restData,
  } as ITopRatedMovies;
};

export default useTopRatedMovies;
