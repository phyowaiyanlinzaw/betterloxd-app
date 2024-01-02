import {View, Text, ScrollView} from 'react-native';
import React, {FC, useEffect, useMemo} from 'react';
import {HomeDrawerProps} from '@/types/navigationType';
import {storage} from '@/db/storage';
import {User} from '@/types/userType';
import currentUser from '@/utils/getCurrentUser';
import useGetUserFavMovies from '@/hooks/useGetUserFavMovies';
import HorizontalList from '@/components/HorizontalList';
import useGetUserWatchList from '@/hooks/useGetUserWatchList';
import {useNavigation} from '@react-navigation/native';

type Props = HomeDrawerProps<'Profile'>;
type Navigation = Props['navigation'];

const ProfileScreen: FC<Props> = () => {
  const navigation = useNavigation<Navigation>();
  const {userFavMovies} = useGetUserFavMovies();
  const {userWatchList} = useGetUserWatchList();

  const favMoviesData = useMemo(() => {
    if (!userFavMovies) {
      return [];
    }
    return userFavMovies.map(movie => ({
      id: movie.id,
      imagePath: movie.poster_path,
    }));
  }, [userFavMovies]);

  const watchListData = useMemo(() => {
    if (!userWatchList) {
      return [];
    }
    return userWatchList.map(movie => ({
      id: movie.id,
      imagePath: movie.poster_path,
    }));
  }, [userWatchList]);

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: '#15181D',
        paddingHorizontal: 10,
        paddingTop: 10,
      }}>
      <View
        style={{
          borderRadius: 50,
          overflow: 'hidden',
          width: 100,
          height: 100,
          alignSelf: 'center',
          marginBottom: 10,
          backgroundColor: '#8899AA',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text
          style={{
            textAlign: 'center',
            fontSize: 50,
            color: '#15181D',
          }}>
          {currentUser.name.split('')[0]}
        </Text>
      </View>
      <View
        style={{
          marginBottom: 10,
        }}>
        <Text
          style={{
            color: '#8899AA',
            fontSize: 20,
            fontWeight: 'bold',
            textAlign: 'center',
          }}>
          {currentUser.name}
        </Text>
        <Text
          style={{
            color: '#8899AA',
            fontSize: 12,
            textAlign: 'center',
          }}>
          {currentUser.email}
        </Text>
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
          Favorite Movies
        </Text>
        <HorizontalList
          data={favMoviesData}
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
          Watch List
        </Text>
        <HorizontalList
          data={watchListData}
          onPressItem={id => {
            navigation.navigate('DetailsScreen', {
              movieId: id,
            });
          }}
        />
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;
