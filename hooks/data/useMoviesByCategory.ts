import useFetchData from '@/hooks/useFetchData';
import {
  fetchMovies,
  fetchTopRatedMovies,
  fetchNowPlayingMovies,
  fetchUpcomingMovies,
} from '@/libs/data/movies';
import { Movie } from '@/types/movie';

type MovieCategory = 'popular' | 'top-rated' | 'now-playing' | 'coming-soon';

const useMoviesByCategory = (category: MovieCategory, page: number = 1) => {
  const getFetchFunction = (cat: MovieCategory) => {
    switch (cat) {
      case 'popular':
        return () => fetchMovies(page);
      case 'top-rated':
        return () => fetchTopRatedMovies(page);
      case 'now-playing':
        return () => fetchNowPlayingMovies(page);
      case 'coming-soon':
        return () => fetchUpcomingMovies(page);
      default:
        return () => fetchMovies(page);
    }
  };

  const getCategoryTitle = (cat: MovieCategory) => {
    switch (cat) {
      case 'popular':
        return 'Popular Movies';
      case 'top-rated':
        return 'Top Rated Movies';
      case 'now-playing':
        return 'Now Playing';
      case 'coming-soon':
        return 'Coming Soon';
      default:
        return 'Movies';
    }
  };

  const {
    data: movies = [],
    isLoading,
    error,
    ...restData
  } = useFetchData<Movie[]>({
    queryKey: ['movies', category, page],
    queryFn: getFetchFunction(category),
  });

  return {
    movies,
    isLoading,
    error,
    categoryTitle: getCategoryTitle(category),
    ...restData,
  };
};

export default useMoviesByCategory;
