import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import MovieSection from './MovieSection';
import usePopularMovies from '@/hooks/data/usePopularMovies';
import useTopRatedMovies from '@/hooks/data/useTopRatedMovies';
import useNowPlayingMovies from '@/hooks/data/useNowPlayingMovies';
import useUpcomingMovies from '@/hooks/data/useUpcomingMovies';

export default function Movies() {
  // Fetch different categories of movies
  const { popularMovies, isLoadingPopular, popularError } = usePopularMovies();
  const { topRatedMovies, isLoadingTopRated, topRatedError } = useTopRatedMovies();
  const { nowPlayingMovies, isLoadingNowPlaying, nowPlayingError } = useNowPlayingMovies();
  const { upcomingMovies, isLoadingUpcoming, upcomingError } = useUpcomingMovies();

  const handleSeeAllPress = (category: string) => {
    // Navigate to MoviesScreen with category parameter
    router.push({
      pathname: '/(app)/(tabs)/movies',
      params: { category: category.toLowerCase().replace(' ', '-') },
    });
  };

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}>
      {/* Popular Movies - Horizontal scroll */}
      <MovieSection
        title="Popular Movies"
        movies={popularMovies}
        isLoading={isLoadingPopular}
        error={popularError}
        onSeeAllPress={() => handleSeeAllPress('Popular')}
        horizontal={true}
      />

      {/* Now Playing Movies - Grid */}
      <MovieSection
        title="Now Playing"
        movies={nowPlayingMovies.slice(0, 6)} // Show first 6 movies
        isLoading={isLoadingNowPlaying}
        error={nowPlayingError}
        onSeeAllPress={() => handleSeeAllPress('Now Playing')}
        horizontal={false}
      />

      {/* Top Rated Movies - Horizontal scroll */}
      <MovieSection
        title="Top Rated"
        movies={topRatedMovies}
        isLoading={isLoadingTopRated}
        error={topRatedError}
        onSeeAllPress={() => handleSeeAllPress('Top Rated')}
        horizontal={true}
      />

      {/* Upcoming Movies - Grid */}
      <MovieSection
        title="Coming Soon"
        movies={upcomingMovies.slice(0, 4)} // Show first 4 movies
        isLoading={isLoadingUpcoming}
        error={upcomingError}
        onSeeAllPress={() => handleSeeAllPress('Coming Soon')}
        horizontal={false}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
