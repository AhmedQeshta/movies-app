// TMDB API Configuration
// Note: In production, store the API key in environment variables
// For now, you'll need to replace 'your_tmdb_api_key_here' with your actual TMDB API key
// Get your API key from: https://www.themoviedb.org/settings/api

export const TMDB_CONFIG = {
  API_KEY: process.env.EXPO_PUBLIC_TMDB_API_KEY || 'your_tmdb_api_key_here',
  BASE_URL: process.env.EXPO_PUBLIC_BASE_URL || 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: process.env.EXPO_PUBLIC_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p/w500',
  POSTER_BASE_URL: process.env.EXPO_PUBLIC_POSTER_BASE_URL || 'https://image.tmdb.org/t/p/w780',
  BACKDROP_BASE_URL:
    process.env.EXPO_PUBLIC_BACKDROP_BASE_URL || 'https://image.tmdb.org/t/p/w1280',
};

export const TMDB_ENDPOINTS = {
  POPULAR_MOVIES: '/movie/popular',
  TOP_RATED_MOVIES: '/movie/top_rated',
  NOW_PLAYING: '/movie/now_playing',
  UPCOMING: '/movie/upcoming',
  SEARCH_MOVIES: '/search/movie',
  MOVIE_DETAILS: (id: number) => `/movie/${id}`,
  MOVIE_CREDITS: (id: number) => `/movie/${id}/credits`,
};
