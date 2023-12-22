import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {FC} from 'react';

import {useQuery} from '@tanstack/react-query';
import {getPopularMovies} from '@/api/movies';
import {HomeDrawerProps, RootStackProps} from '@/types/navigationType';

type HomeScreenProps = HomeDrawerProps<'Home'>;

const HomeScreen: FC<HomeScreenProps> = () => {
  const {data} = useQuery({
    queryKey: ['movies-list'],
    queryFn: getPopularMovies,
  });

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1B2126',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FlatList
        data={data?.results}
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
