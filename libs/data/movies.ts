import { TMDB_CONFIG, TMDB_ENDPOINTS } from '@/constants/Api';
import { MoviesResponse, Movie, MovieDetails, MovieCredits } from '@/types/movie';

// Helper function to build API URL
const buildApiUrl = (endpoint: string, params?: Record<string, string | number>): string => {
  const url = new URL(TMDB_CONFIG.BASE_URL + endpoint);
  url.searchParams.append('api_key', TMDB_CONFIG.API_KEY);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value.toString());
    });
  }
  
  return url.toString();
};

// Function to fetch popular movies from TMDB
export const fetchMovies = async (page: number = 1): Promise<Movie[]> => {
  try {
    const url = buildApiUrl(TMDB_ENDPOINTS.POPULAR_MOVIES, { page });
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch movies: ${response.status} ${response.statusText}`);
    }
    
    const data: MoviesResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

// Function to fetch top rated movies
export const fetchTopRatedMovies = async (page: number = 1): Promise<Movie[]> => {
  try {
    const url = buildApiUrl(TMDB_ENDPOINTS.TOP_RATED_MOVIES, { page });
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch top rated movies: ${response.status} ${response.statusText}`);
    }
    
    const data: MoviesResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching top rated movies:', error);
    throw error;
  }
};

// Function to fetch now playing movies
export const fetchNowPlayingMovies = async (page: number = 1): Promise<Movie[]> => {
  try {
    const url = buildApiUrl(TMDB_ENDPOINTS.NOW_PLAYING, { page });
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch now playing movies: ${response.status} ${response.statusText}`);
    }
    
    const data: MoviesResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching now playing movies:', error);
    throw error;
  }
};

// Function to fetch upcoming movies
export const fetchUpcomingMovies = async (page: number = 1): Promise<Movie[]> => {
  try {
    const url = buildApiUrl(TMDB_ENDPOINTS.UPCOMING, { page });
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch upcoming movies: ${response.status} ${response.statusText}`);
    }
    
    const data: MoviesResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching upcoming movies:', error);
    throw error;
  }
};

// Function to search movies
export const searchMovies = async (query: string, page: number = 1): Promise<Movie[]> => {
  try {
    const url = buildApiUrl(TMDB_ENDPOINTS.SEARCH_MOVIES, { query, page });
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to search movies: ${response.status} ${response.statusText}`);
    }
    
    const data: MoviesResponse = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

// Function to fetch movie details
export const fetchMovieDetails = async (movieId: number): Promise<MovieDetails> => {
  try {
    const url = buildApiUrl(TMDB_ENDPOINTS.MOVIE_DETAILS(movieId));
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch movie details: ${response.status} ${response.statusText}`);
    }
    
    const data: MovieDetails = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};

// Function to fetch movie credits (cast and crew)
export const fetchMovieCredits = async (movieId: number): Promise<MovieCredits> => {
  try {
    const url = buildApiUrl(TMDB_ENDPOINTS.MOVIE_CREDITS(movieId));
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch movie credits: ${response.status} ${response.statusText}`);
    }
    
    const data: MovieCredits = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie credits:', error);
    throw error;
  }
};

// Helper function to get full image URL
export const getImageUrl = (imagePath: string | null, size: 'poster' | 'backdrop' | 'profile' = 'poster'): string | null => {
  if (!imagePath) return null;
  
  const baseUrl = size === 'backdrop' 
    ? TMDB_CONFIG.BACKDROP_BASE_URL 
    : size === 'poster'
    ? TMDB_CONFIG.POSTER_BASE_URL
    : TMDB_CONFIG.IMAGE_BASE_URL;
    
  return `${baseUrl}${imagePath}`;
};
