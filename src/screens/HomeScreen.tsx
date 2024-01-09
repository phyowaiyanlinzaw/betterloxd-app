import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import React, {FC, useMemo} from 'react';

import {HomeDrawerProps, RootStackProps} from '@/types/navigationType';
import useGetPopularMovies from '@/hooks/useGetPopularMovies';
import HorizontalList from '@/components/HorizontalList';
import useGetTopRatedMovies from '@/hooks/useGetTopRatedMovies';
import {useNavigation} from '@react-navigation/native';
import useGetUpcomingMovies from '@/hooks/useGetUpcomingMovies';
import {storage} from '@/db/storage';
import {useAppSelector} from '@/redux/hook/hook';
import currentUser from '@/utils/getCurrentUser';

type HomeScreenProps = HomeDrawerProps<'Home'>;
type Navigation = HomeScreenProps['navigation'];

const HomeScreen: FC<HomeScreenProps> = () => {
  const {
    popularMoviesData,
    isFetchingNextPagePopularMovies,
    fetchNextPagePopularMovies,
    hasNextPagePopularMovies,
  } = useGetPopularMovies();
  const {
    topRatedMoviesData,
    isFetchingNextPageTopRatedMovies,
    fetchNextPageTopRatedMovies,
    hasNextPageTopRatedMovies,
  } = useGetTopRatedMovies();

  const {
    upcomingMoviesData,
    fetchNextPageUpcomingMovies,
    isFetchingNextPageUpcomingMovies,
    hasNextPageUpcomingMovies,
  } = useGetUpcomingMovies();

  const currentUserStore = useAppSelector(state => state.user);

  console.log('currentUserStore Homescreen', currentUserStore);

  const popularMovies = useMemo(() => {
    if (!popularMoviesData) {
      return [];
    }
    return popularMoviesData
      .filter(movie => movie.vote_average > 6.5)
      .map(movie => ({
        id: movie.id,
        imagePath: movie.poster_path,
      }));
  }, [popularMoviesData]);

  const topRatedMovies = useMemo(() => {
    if (!topRatedMoviesData) {
      return [];
    }
    return topRatedMoviesData.map(movie => ({
      id: movie.id,
      imagePath: movie.poster_path,
    }));
  }, [topRatedMoviesData]);

  const upcomingMovies = useMemo(() => {
    if (!upcomingMoviesData) {
      return [];
    }
    return upcomingMoviesData.map(movie => ({
      id: movie.id,
      imagePath: movie.poster_path,
    }));
  }, [upcomingMoviesData]);

  const navigation = useNavigation<Navigation>();

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#1B2126',
      }}>
      <View
        style={{
          backgroundColor: '#1B2126',
          padding: 10,
        }}>
        <View
          style={{
            paddingHorizontal: 5,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: '#8899AA',
              fontSize: 20,
              fontWeight: 'bold',
              padding: 10,
            }}>
            Recent Popular Movies
          </Text>
          <HorizontalList
            data={popularMovies}
            onPressItem={id => {
              navigation.navigate('DetailsScreen', {
                movieId: id,
              });
            }}
            onEndReachFetchFunc={fetchNextPagePopularMovies}
            isFetchingNextPage={isFetchingNextPagePopularMovies}
            hasNextPage={hasNextPagePopularMovies}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 5,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: '#8899AA',
              fontSize: 20,
              fontWeight: 'bold',
              padding: 10,
            }}>
            Top Rated Movies
          </Text>
          <HorizontalList
            data={topRatedMovies}
            onPressItem={id => {
              navigation.navigate('DetailsScreen', {
                movieId: id,
              });
            }}
            onEndReachFetchFunc={fetchNextPageTopRatedMovies}
            isFetchingNextPage={isFetchingNextPageTopRatedMovies}
            hasNextPage={hasNextPageTopRatedMovies}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 5,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: '#8899AA',
              fontSize: 20,
              fontWeight: 'bold',
              padding: 10,
            }}>
            Upcoming Movies
          </Text>
          <HorizontalList
            data={upcomingMovies}
            onPressItem={id => {
              navigation.navigate('DetailsScreen', {
                movieId: id,
              });
            }}
            onEndReachFetchFunc={fetchNextPageUpcomingMovies}
            isFetchingNextPage={isFetchingNextPageUpcomingMovies}
            hasNextPage={hasNextPageUpcomingMovies}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
