import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { getImageUrl } from '@/libs/data/movies';
import { MovieCardProps } from '@/types/movie';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 2; // 20px margin on each side + 20px gap between cards

export default function MovieCard({ movie, onPress }: MovieCardProps) {
  const posterUrl = getImageUrl(movie.poster_path, 'poster');

  const handlePress = () => {
    // Navigate to movie details page
    router.push(`/movie/${movie.id}`);
    // Also call the optional onPress callback if provided
    onPress?.(movie);
  };

  const formatRating = (rating: number) => {
    return rating.toFixed(1);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handlePress} activeOpacity={0.9}>
      <View style={styles.card}>
        {/* Movie Poster */}
        <View style={styles.posterContainer}>
          {posterUrl ? (
            <Image source={{ uri: posterUrl }} style={styles.poster} resizeMode="cover" />
          ) : (
            <View style={styles.placeholderPoster}>
              <Text style={styles.placeholderText}>No Image</Text>
            </View>
          )}

          {/* Rating Badge */}
          {movie.vote_average > 0 && (
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>⭐ {formatRating(movie.vote_average)}</Text>
            </View>
          )}
        </View>

        {/* Movie Info */}
        <LinearGradient colors={['transparent', 'rgba(0,0,0,0.8)']} style={styles.infoGradient}>
          <View style={styles.movieInfo}>
            <Text style={styles.title} numberOfLines={2}>
              {movie.title}
            </Text>
            {movie.release_date && (
              <Text style={styles.year}>{formatDate(movie.release_date)}</Text>
            )}
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: cardWidth,
    marginBottom: 20,
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
    height: cardWidth * 1.5, // 3:2 aspect ratio
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
});
