import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Movie } from '@/types/movie';
import MovieCard from './MovieCard';
import { Colors } from '@/constants/Colors';

interface MovieSectionProps {
  title: string;
  movies: Movie[];
  isLoading?: boolean;
  error?: Error | null;
  onMoviePress?: (movie: Movie) => void;
  onSeeAllPress?: () => void;
  horizontal?: boolean;
}

export default function MovieSection({
  title,
  movies,
  isLoading = false,
  error = null,
  onMoviePress,
  onSeeAllPress,
  horizontal = false,
}: MovieSectionProps) {
  const renderMovieCard = ({ item }: { item: Movie }) => (
    <MovieCard movie={item} onPress={onMoviePress} />
  );

  const renderHorizontalMovieCard = ({ item }: { item: Movie }) => (
    <View style={styles.horizontalCardWrapper}>
      <MovieCard movie={item} onPress={onMoviePress} />
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.loadingText}>Loading movies...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error.message || 'Failed to load movies'}</Text>
        </View>
      </View>
    );
  }

  if (!movies || movies.length === 0) {
    return (
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No movies found</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {onSeeAllPress && movies.length > 0 && (
          <TouchableOpacity onPress={onSeeAllPress} activeOpacity={0.7}>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        )}
      </View>

      {horizontal ? (
        <FlatList
          data={movies.slice(0, 10)} // Show max 10 items in horizontal scroll
          renderItem={renderHorizontalMovieCard}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.horizontalList}
        />
      ) : (
        <FlatList
          data={movies}
          renderItem={renderMovieCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
          scrollEnabled={false} // Disable scroll when inside another scroll view
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  seeAllText: {
    fontSize: 16,
    color: Colors.primary,
    fontWeight: '600',
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  horizontalList: {
    paddingLeft: 0, // No left padding since parent has 20px
    paddingRight: 20, // Right padding to match parent
  },
  horizontalCardWrapper: {
    marginRight: 16,
    width: 160, // Fixed width for horizontal cards
  },
  loadingContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 40,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#6B7280',
  },
  errorContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  errorText: {
    fontSize: 16,
    color: Colors.warning,
    textAlign: 'center',
  },
  emptyContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
});
