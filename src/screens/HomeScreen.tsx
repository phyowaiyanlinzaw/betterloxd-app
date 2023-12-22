import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {FC, useEffect, useMemo} from 'react';

import {useQuery} from '@tanstack/react-query';
import {getPopularMovies} from '@/api/movies';
import {HomeDrawerProps, RootStackProps} from '@/types/navigationType';
import useGetPopularMovies from '@/hooks/useGetPopularMovies';
import HorizontalList from '@/components/HorizontalList';
import useGetTopRatedMovies from '@/hooks/useGetTopRatedMovies';
import {useNavigation} from '@react-navigation/native';

type HomeScreenProps = HomeDrawerProps<'Home'>;
type Navigation = HomeScreenProps['navigation'];

const HomeScreen: FC<HomeScreenProps> = () => {
  const {popularMoviesData, isLoading} = useGetPopularMovies();
  const {topRatedMoviesData} = useGetTopRatedMovies();

  const popularMovies = useMemo(() => {
    if (!popularMoviesData) {
      return [];
    }
    return popularMoviesData.results.map(movie => ({
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

  const navigation = useNavigation<Navigation>();

  return (
    <View
      style={{
        flex: 1,
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
        />
      </View>
      <View
        style={{
          padding: 10,
          paddingHorizontal: 10,
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
        <HorizontalList data={topRatedMovies} />
      </View>
    </View>
  );
};

export default HomeScreen;
