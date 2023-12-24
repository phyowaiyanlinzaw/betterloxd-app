import {View, Text, TextInput, Image, TouchableOpacity} from 'react-native';
import React, {FC, useDeferredValue, useEffect, useState} from 'react';
import {DrawerScreenProps} from '@react-navigation/drawer';
import {HomeDrawerProps} from '@/types/navigationType';
import {Movie} from '@/types/movieType';
import {useQuery} from '@tanstack/react-query';
import {searchMovies} from '@/api/moviesApi';
import {FlatList} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

type Props = HomeDrawerProps<'Search'>;

type Navigation = Props['navigation'];

const SearchScreen: FC<Props> = () => {
  const navigation = useNavigation<Navigation>();
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState<string>('');

  const query = useDeferredValue(search);

  const {data} = useQuery({
    queryKey: ['search', query],
    queryFn: searchMovies,
  });

  useEffect(() => {
    if (data) {
      setMovies(data.results);
    }
  }, [data]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#15181D',
      }}>
      <View
        style={{
          width: '90%',
          height: 50,
          backgroundColor: '#1B2126',
          borderRadius: 10,
          marginTop: 10,
          alignSelf: 'center',
          justifyContent: 'center',
          paddingLeft: 10,
        }}>
        <TextInput
          placeholder={'Search Movies'}
          style={{
            color: '#8899AA',
            fontSize: 20,
          }}
          placeholderTextColor={'#8899AA'}
          onChangeText={input => {
            setSearch(input);
          }}
          value={search}
        />
      </View>
      {/* {movies.map(movie => {
        return (
          <View key={movie.id}>
            <Text
              style={{
                color: '#8899AA',
              }}>
              {movie.title}
            </Text>
          </View>
        );
      })} */}
      <FlatList
        data={movies.filter(
          movie => movie.poster_path !== null && movie.vote_average > 6,
        )}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={{
                margin: 10,
                width: 100,
                height: 150,
                borderRadius: 10,
                overflow: 'hidden',
              }}
              onPress={() => {
                navigation.navigate('DetailsScreen', {
                  movieId: item.id,
                });
              }}>
              <Image
                source={{
                  uri: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                }}
                style={{
                  width: '100%',
                  height: '100%',
                }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default SearchScreen;
