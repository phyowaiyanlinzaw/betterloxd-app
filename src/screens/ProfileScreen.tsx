import {View, Text, ScrollView, Pressable} from 'react-native';
import React, {FC, useEffect, useMemo} from 'react';
import {HomeDrawerProps} from '@/types/navigationType';
import useGetUserFavMovies from '@/hooks/useGetUserFavMovies';
import HorizontalList from '@/components/HorizontalList';
import useGetUserWatchList from '@/hooks/useGetUserWatchList';
import {useNavigation} from '@react-navigation/native';
import {useAppDispatch, useAppSelector} from '@/redux/hook/hook';
import {getUser} from '@/utils/getCurrentUser';
import {setUser} from '@/redux/features/userSlice';
import {getCurrentUser} from '@/api/usersApi';
import {User} from '@/types/userType';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

type Props = HomeDrawerProps<'Profile'>;
type Navigation = Props['navigation'];

const ProfileScreen: FC<Props> = () => {
  const navigation = useNavigation<Navigation>();
  const {userFavMovies, refetchFavs} = useGetUserFavMovies();
  const {userWatchList} = useGetUserWatchList();

  useEffect(() => {
    setTimeout(() => {
      refetchFavs();
    }, 500);
  }, [userFavMovies]);

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

  const dispatch = useAppDispatch();

  const currentUserFromStore = useAppSelector(state => state.user.user);

  const getCurrentUser = async () => {
    const user = await getUser();
    return user;
  };

  useEffect(() => {
    getCurrentUser().then(user => {
      dispatch(setUser(user));
    });
  }, [currentUserFromStore.favs, currentUserFromStore.watchlist]);

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
          {currentUserFromStore.name.charAt(0)}
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
          {currentUserFromStore.name}
        </Text>
        <Text
          style={{
            color: '#8899AA',
            fontSize: 12,
            textAlign: 'center',
          }}>
          {currentUserFromStore.email}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: 5,
          borderRadius: 10,
        }}>
        <Pressable
          onPress={() => {
            refetchFavs();
          }}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
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
        </Pressable>
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
