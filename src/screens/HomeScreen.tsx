import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {FC, useEffect, useMemo} from 'react';

import {useQuery} from '@tanstack/react-query';
import {getPopularMovies} from '@/api/movies';
import {HomeDrawerProps, RootStackProps} from '@/types/navigationType';
import useGetPopularMovies from '@/hooks/useGetPopularMovies';

type HomeScreenProps = HomeDrawerProps<'Home'>;

const HomeScreen: FC<HomeScreenProps> = () => {
  const {data} = useGetPopularMovies();

  const popularMovies = useMemo(() => {
    return data?.results.filter(movie => {
      return movie.vote_average > 6.5;
    });
  }, [data]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1B2126',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FlatList
        data={popularMovies}
        renderItem={({item}) => (
          <TouchableOpacity>
            <Text style={{color: '#8899AA'}}>{item.title}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default HomeScreen;
