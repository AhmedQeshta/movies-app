import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLocalSearchParams, router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import useMoviesByCategory from '@/hooks/data/useMoviesByCategory';
import { Movie } from '@/types/movie';
import { Colors } from '@/constants/Colors';
import LoadingMovie from '@/components/movies/LoadingMovie';
import ErrorMovie from '@/components/movies/ErrorMovie';
import MovieCard from '@/components/movies/MovieCard';

export default function MoviesScreen() {
  const { category } = useLocalSearchParams<{ category: string }>();

  // Convert category parameter to the expected format
  const movieCategory = (category || 'popular') as
    | 'popular'
    | 'top-rated'
    | 'now-playing'
    | 'coming-soon';

  const { movies, isLoading, error, categoryTitle } = useMoviesByCategory(movieCategory);

  const handleBackPress = () => {
    router.back();
  };

  const handlePress = (movie: Movie) => {
    router.push(`/movie/${movie.id}`);
  };

  const renderMovieCard = ({ item }: { item: Movie }) => (
    <MovieCard movie={item} onPress={() => handlePress(item)} />
  );

  if (isLoading) return <LoadingMovie />;
  if (error) return <ErrorMovie />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <AntDesign name="arrowleft" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{categoryTitle}</Text>
        <View style={styles.placeholder} />
      </View>

      <FlatList
        data={movies}
        renderItem={renderMovieCard}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  listContainer: {
    padding: 20,
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  movieCard: {
    width: '48%',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  posterContainer: {
    position: 'relative',
    width: '100%',
    height: 240,
  },
  poster: {
    width: '100%',
    height: '100%',
  },
  placeholderPoster: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f3f4f6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#9ca3af',
    fontSize: 14,
    fontWeight: '500',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  ratingText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
  },
  infoGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    justifyContent: 'flex-end',
  },
  movieInfo: {
    padding: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 18,
    marginBottom: 4,
  },
  year: {
    color: '#E5E7EB',
    fontSize: 12,
    fontWeight: '500',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    margin: 20,
    borderRadius: 20,
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    margin: 20,
    borderRadius: 20,
    padding: 24,
  },
  errorText: {
    fontSize: 16,
    color: Colors.warning,
    textAlign: 'center',
  },
});
