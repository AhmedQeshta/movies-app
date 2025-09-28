import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, router } from 'expo-router';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { getImageUrl } from '@/libs/data/movies';
import { Colors } from '@/constants/Colors';
import useMovieDetails from '@/hooks/data/useMovieDetails';
import useMovieCredits from '@/hooks/data/useMovieCredits';
import { formatRuntime, formatCurrency, formatDate } from '@/libs/utils/date';
import LoadingMovie from '@/components/movies/LoadingMovie';
import ErrorMovie from '@/components/movies/ErrorMovie';

const { height } = Dimensions.get('window');

export default function MovieDetailsPage() {
  const { id } = useLocalSearchParams();
  const movieId = parseInt(id as string);

  const { movieDetails, isLoadingDetails, detailsError } = useMovieDetails(movieId);
  const { movieCredits, isLoadingCredits, creditsError } = useMovieCredits(movieId);

  if (isLoadingDetails) return <LoadingMovie />;
  if (detailsError || !movieDetails) return <ErrorMovie />;

  const backdropUrl = getImageUrl(movieDetails.backdrop_path, 'backdrop');
  const posterUrl = getImageUrl(movieDetails.poster_path, 'poster');
  const mainCast = movieCredits?.cast.slice(0, 6) || [];

  return (
    <LinearGradient colors={['#1a1a2e', '#16213e']} style={styles.gradient}>
      <StatusBar style="light" backgroundColor="#1a1a2e" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Backdrop Image Header */}
        <View style={styles.backdropContainer}>
          {backdropUrl ? (
            <Image source={{ uri: backdropUrl }} style={styles.backdrop} />
          ) : (
            <View style={styles.backdropPlaceholder}>
              <Ionicons name="film-outline" size={60} color="#666" />
            </View>
          )}

          {/* Gradient Overlay */}
          <LinearGradient
            colors={['transparent', 'rgba(26, 26, 46, 0.8)', '#1a1a2e']}
            style={styles.backdropGradient}
          />

          {/* Close Button */}
          <SafeAreaView style={styles.closeButtonSafeArea}>
            <TouchableOpacity style={styles.closeIcon} onPress={() => router.push('/')}>
              <Ionicons name="close" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </SafeAreaView>
        </View>

        {/* Movie Content */}
        <View style={styles.contentContainer}>
          {/* Movie Header */}
          <View style={styles.movieHeader}>
            <View style={styles.posterContainer}>
              {posterUrl ? (
                <Image source={{ uri: posterUrl }} style={styles.poster} />
              ) : (
                <View style={styles.posterPlaceholder}>
                  <Ionicons name="image-outline" size={40} color="#666" />
                </View>
              )}
            </View>

            <View style={styles.movieInfo}>
              <Text style={styles.title}>{movieDetails.title}</Text>

              {movieDetails.tagline && <Text style={styles.tagline}>{movieDetails.tagline}</Text>}

              <View style={styles.movieMeta}>
                <View style={styles.ratingContainer}>
                  <AntDesign name="star" size={16} color="#FFD700" />
                  <Text style={styles.rating}>{movieDetails.vote_average.toFixed(1)}</Text>
                  <Text style={styles.ratingCount}>({movieDetails.vote_count})</Text>
                </View>

                <Text style={styles.year}>{new Date(movieDetails.release_date).getFullYear()}</Text>

                <Text style={styles.runtime}>
                  {movieDetails.runtime ? `${movieDetails.runtime} min` : ''}
                </Text>
              </View>

              {/* Genres */}
              <View style={styles.genresContainer}>
                {movieDetails?.genres.map(
                  (genre: {
                    id: React.Key | null | undefined;
                    name:
                      | string
                      | number
                      | bigint
                      | boolean
                      | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
                      | Iterable<React.ReactNode>
                      | React.ReactPortal
                      | Promise<
                          | string
                          | number
                          | bigint
                          | boolean
                          | React.ReactPortal
                          | React.ReactElement<unknown, string | React.JSXElementConstructor<any>>
                          | Iterable<React.ReactNode>
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                  }) => (
                    <View key={genre.id} style={styles.genreTag}>
                      <Text style={styles.genreText}>{genre.name}</Text>
                    </View>
                  ),
                )}
              </View>
            </View>
          </View>

          {/* Overview */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Overview</Text>
            <Text style={styles.overview}>{movieDetails.overview}</Text>
          </View>

          {/* Cast */}
          {isLoadingCredits && !creditsError ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={Colors.primary} />
            </View>
          ) : (
            mainCast.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Cast</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View style={styles.castContainer}>
                    {mainCast.map((actor) => (
                      <View key={actor.id} style={styles.castMember}>
                        <View style={styles.actorImageContainer}>
                          {actor.profile_path ? (
                            <Image
                              source={{ uri: getImageUrl(actor.profile_path, 'profile') }}
                              style={styles.actorImage}
                            />
                          ) : (
                            <View style={styles.actorImagePlaceholder}>
                              <Ionicons name="person-outline" size={30} color="#666" />
                            </View>
                          )}
                        </View>
                        <Text style={styles.actorName} numberOfLines={2}>
                          {actor.name}
                        </Text>
                        <Text style={styles.characterName} numberOfLines={2}>
                          {actor.character}
                        </Text>
                      </View>
                    ))}
                  </View>
                </ScrollView>
              </View>
            )
          )}

          {/* Movie Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>
            <View style={styles.detailsGrid}>
              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Release Date</Text>
                <Text style={styles.detailValue}>{formatDate(movieDetails.release_date)}</Text>
              </View>

              {movieDetails.budget > 0 && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Budget</Text>
                  <Text style={styles.detailValue}>{formatCurrency(movieDetails.budget)}</Text>
                </View>
              )}

              {movieDetails.revenue > 0 && (
                <View style={styles.detailItem}>
                  <Text style={styles.detailLabel}>Revenue</Text>
                  <Text style={styles.detailValue}>{formatCurrency(movieDetails.revenue)}</Text>
                </View>
              )}

              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Status</Text>
                <Text style={styles.detailValue}>{movieDetails.status}</Text>
              </View>

              <View style={styles.detailItem}>
                <Text style={styles.detailLabel}>Language</Text>
                <Text style={styles.detailValue}>
                  {movieDetails.original_language.toUpperCase()}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },

  backdropContainer: {
    position: 'relative',
    height: height * 0.4,
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  backdropPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  backdropGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
  },
  closeButtonSafeArea: {
    position: 'absolute',
    top: 0,
    right: 20,
    zIndex: 10,
  },
  closeIcon: {
    marginTop: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    marginTop: -60,
  },
  movieHeader: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  posterContainer: {
    marginRight: 16,
  },
  poster: {
    width: 120,
    height: 180,
    borderRadius: 12,
  },
  posterPlaceholder: {
    width: 120,
    height: 180,
    borderRadius: 12,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieInfo: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  tagline: {
    fontSize: 16,
    color: '#B0B0B0',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  movieMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    marginBottom: 4,
  },
  rating: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  ratingCount: {
    fontSize: 14,
    color: '#B0B0B0',
    marginLeft: 4,
  },
  year: {
    fontSize: 16,
    color: '#E5E7EB',
    marginRight: 16,
    marginBottom: 4,
  },
  runtime: {
    fontSize: 16,
    color: '#E5E7EB',
    marginBottom: 4,
  },
  genresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  genreTag: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
    marginBottom: 4,
  },
  genreText: {
    fontSize: 12,
    color: '#E5E7EB',
    fontWeight: '500',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  overview: {
    fontSize: 16,
    color: '#E5E7EB',
    lineHeight: 24,
  },
  castContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  castMember: {
    marginRight: 16,
    width: 80,
    alignItems: 'center',
  },
  actorImageContainer: {
    marginBottom: 8,
  },
  actorImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  actorImagePlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actorName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 2,
  },
  characterName: {
    fontSize: 11,
    color: '#B0B0B0',
    textAlign: 'center',
  },
  detailsGrid: {
    gap: 16,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  detailLabel: {
    fontSize: 16,
    color: '#B0B0B0',
    fontWeight: '500',
  },
  detailValue: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'right',
    flex: 1,
    marginLeft: 16,
  },
  backButton: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
