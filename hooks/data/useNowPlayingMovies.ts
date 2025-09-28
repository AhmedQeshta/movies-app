import useFetchData from '@/hooks/useFetchData';
import { fetchNowPlayingMovies } from '@/libs/data/movies';
import { INowPlayingMovies } from '@/types/data';
import { Movie } from '@/types/movie';

const useNowPlayingMovies = (): INowPlayingMovies => {
  const {
    data: nowPlayingMovies = [],
    isLoading: isLoadingNowPlaying,
    error: nowPlayingError,
    ...restData
  } = useFetchData<Movie[]>({
    queryKey: ['movies', 'now-playing'],
    queryFn: () => fetchNowPlayingMovies(1),
  });
  return {
    nowPlayingMovies,
    isLoadingNowPlaying,
    nowPlayingError,
    ...restData,
  } as INowPlayingMovies;
};

export default useNowPlayingMovies;
