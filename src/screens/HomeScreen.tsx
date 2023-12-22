import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {FC, useEffect, useMemo} from 'react';

import {useQuery} from '@tanstack/react-query';
import {getPopularMovies} from '@/api/movies';
import {HomeDrawerProps, RootStackProps} from '@/types/navigationType';
import useGetPopularMovies from '@/hooks/useGetPopularMovies';
import HorizontalList from '@/components/HorizontalList';

type HomeScreenProps = HomeDrawerProps<'Home'>;

const HomeScreen: FC<HomeScreenProps> = () => {
  const {data, isLoading} = useGetPopularMovies();

  const popularMovies = useMemo(() => {
    if (!data) {
      return [];
    }
    return data.results.map(movie => ({
      id: movie.id,
      imagePath: movie.poster_path,
    }));
  }, [data]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1B2126',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          flex: 1,
          width: '100%',
          padding: 10,
          paddingHorizontal: 10,
          paddingVertical: 10,
          borderRadius: 10,
          overflow: 'hidden',
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
        <HorizontalList data={popularMovies} />
      </View>
    </View>
  );
};

export default HomeScreen;
