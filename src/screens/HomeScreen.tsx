import {View, Text} from 'react-native';
import React, {FC, useMemo} from 'react';

import {HomeDrawerProps, RootStackProps} from '@/types/navigationType';
import useGetPopularMovies from '@/hooks/useGetPopularMovies';
import HorizontalList from '@/components/HorizontalList';
import useGetTopRatedMovies from '@/hooks/useGetTopRatedMovies';
import {useNavigation} from '@react-navigation/native';
import useGetUpcomingMovies from '@/hooks/useGetUpcomingMovies';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {storage} from '@/db/storage';

type HomeScreenProps = RootStackProps<'HomeScreen'>;
type Navigation = HomeScreenProps['navigation'];

const HomeScreen: FC<HomeScreenProps> = () => {
  const {popularMoviesData, isLoading} = useGetPopularMovies();
  const {topRatedMoviesData} = useGetTopRatedMovies();
  const {upcomingMoviesData} = useGetUpcomingMovies();

  const popularMovies = useMemo(() => {
    if (!popularMoviesData) {
      return [];
    }
    return popularMoviesData.results
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
    return topRatedMoviesData.results.map(movie => ({
      id: movie.id,
      imagePath: movie.poster_path,
    }));
  }, [topRatedMoviesData]);

  const upcomingMovies = useMemo(() => {
    if (!upcomingMoviesData) {
      return [];
    }
    return upcomingMoviesData.results.map(movie => ({
      id: movie.id,
      imagePath: movie.poster_path,
    }));
  }, [upcomingMoviesData]);

  const navigation = useNavigation<Navigation>();

  return (
    <View
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
            {/* Recent Popular Movies */}
            {storage.getString('user.name')}
          </Text>
          <HorizontalList
            data={popularMovies}
            onPressItem={id => {
              navigation.navigate('DetailsScreen', {
                movieId: id,
              });
            }}
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
          />
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
          backgroundColor: '#15181D',
          height: 80,
          borderRadius: 10,
          padding: 10,
          marginVertical: 10,
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{
            backgroundColor: '#1B2126',
            padding: 10,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: '#1B2',
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#1B2126',
            padding: 10,
            borderRadius: 10,
          }}
          onPress={() => {
            navigation.navigate('SearchScreen');
          }}>
          <Text
            style={{
              color: '#1B2',
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            Search
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#1B2126',
            padding: 10,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: '#1B2',
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            Watchlist
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor: '#1B2126',
            padding: 10,
            borderRadius: 10,
          }}>
          <Text
            style={{
              color: '#1B2',
              fontSize: 15,
              fontWeight: 'bold',
            }}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
