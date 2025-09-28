import { UseQueryResult } from '@tanstack/react-query';
import { Movie, MovieCredits, MovieDetails } from '@/types/movie';

export interface IFetchDataHookProps<T> {
  queryFn: () => Promise<T>;
  queryKey: string[];
  staleTime?: number;
  enabled?: boolean;
}

export interface IPopularMovies
  extends Omit<UseQueryResult<Movie[], Error>, 'data' | 'isLoading' | 'error'> {
  popularMovies: Movie[];
  isLoadingPopular: boolean;
  popularError: Error | null;
}

export interface ITopRatedMovies
  extends Omit<UseQueryResult<Movie[], Error>, 'data' | 'isLoading' | 'error'> {
  topRatedMovies: Movie[];
  isLoadingTopRated: boolean;
  topRatedError: Error | null;
}

export interface INowPlayingMovies
  extends Omit<UseQueryResult<Movie[], Error>, 'data' | 'isLoading' | 'error'> {
  nowPlayingMovies: Movie[];
  isLoadingNowPlaying: boolean;
  nowPlayingError: Error | null;
}

export interface IUpcomingMovies
  extends Omit<UseQueryResult<Movie[], Error>, 'data' | 'isLoading' | 'error'> {
  upcomingMovies: Movie[];
  isLoadingUpcoming: boolean;
  upcomingError: Error | null;
}

// IMovieDetails
export interface IMovieDetails
  extends Omit<UseQueryResult<MovieDetails, Error>, 'data' | 'isLoading' | 'error'> {
  movieDetails: Movie;
  isLoadingDetails: boolean;
  detailsError: Error | null;
}

// IMovieDetails
export interface IMovieCredits
  extends Omit<UseQueryResult<MovieCredits, Error>, 'data' | 'isLoading' | 'error'> {
  movieCredits: MovieCredits;
  isLoadingCredits: boolean;
  creditsError: Error | null;
}
