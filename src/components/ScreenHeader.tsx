import {AnimationProps} from '@/types/AnimationPropsType';
import {getDetailsScreenConst} from '@/utils/getDetailsScreenConst';
import React, {FC, useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import tailwind from 'twrnc';
import Modal from 'react-native-modal';
import useGetUserFavMovies from '@/hooks/useGetUserFavMovies';
import useGetUserWatchList from '@/hooks/useGetUserWatchList';
import {useAppDispatch, useAppSelector} from '@/redux/hook/hook';
import {getWidthHeightStuff} from '@/utils/getWidthHeightStuff';
import {useToast} from 'react-native-toast-notifications';
import {getCurrentUser} from '@/api/usersApi';
import {setUser} from '@/redux/features/userSlice';

const ScreenHeader: FC<AnimationProps> = ({sv, movie, onBackNav}) => {
  const inset = useSafeAreaInsets();
  const {posterSize, headerTop} = getDetailsScreenConst();
  const opacityAnim = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        sv.value,
        [
          ((posterSize - (headerTop + inset.top)) / 4) * 3,
          posterSize - (headerTop + inset.top) + 1,
        ],
        [0, 1],
      ),
      transform: [
        {
          scale: interpolate(
            sv.value,
            [
              ((posterSize - (headerTop + inset.top)) / 4) * 3,
              posterSize - (headerTop + inset.top) + 1,
            ],
            [0.98, 1],
            Extrapolation.CLAMP,
          ),
        },
        {
          translateY: interpolate(
            sv.value,
            [
              ((posterSize - (headerTop + inset.top)) / 4) * 3,
              posterSize - (headerTop + inset.top) + 1,
            ],
            [-10, 0],
            Extrapolation.CLAMP,
          ),
        },
      ],
      paddingTop: inset.top === 0 ? 8 : inset.top,
    };
  });

  const [isModalVisible, setModalVisible] = useState(false);

  const currentUser = useAppSelector(state => state.user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const getUserData = async () => {
      const user = await getCurrentUser();
      return user;
    };
    getUserData().then(user => {
      dispatch(setUser(user!));
    });
  }, []);

  const {handleAddToFav, handleRemoveFromFav} = useGetUserFavMovies();
  const {handleAddToWatchList, handleRemoveFromWatchList} =
    useGetUserWatchList();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const toast = useToast();

  const showToast = () => {
    toast.show('Success', {
      type: 'success',
      placement: 'bottom',
      duration: 4000,
      animationType: 'zoom-in',
    });
  };

  const {RPH} = getWidthHeightStuff();

  const isAlreadyInUserFav = currentUser?.favs?.includes(movie?.id!);
  const isAlreadyInUserWatchList = currentUser?.watchlist?.includes(movie?.id!);

  return (
    <Animated.View
      style={[
        tailwind.style(
          'absolute w-full px-4 pb-2 flex flex-row items-start justify-between z-10 bg-black',
        ),
        opacityAnim,
      ]}>
      <Text
        style={{
          color: '#8899AA',
          fontSize: 15,
          fontWeight: 'bold',
          padding: 10,
        }}
        onPress={onBackNav}>
        Back
      </Text>
      <Animated.Text
        style={{
          color: '#8899AA',
          fontSize: 20,
          fontWeight: 'bold',
          padding: 10,
          width: 200,
          textAlign: 'center',
        }}>
        {movie?.title!}
      </Animated.Text>
      <Text
        style={{
          color: '#8899AA',
          fontSize: 15,
          fontWeight: 'bold',
          padding: 10,
        }}
        onPress={toggleModal}>
        Menu
      </Text>
      <Modal
        isVisible={isModalVisible}
        animationIn={'bounceInUp'}
        animationOut={'bounceOutDown'}
        style={{
          justifyContent: 'flex-end',
          margin: 0,
        }}
        onBackdropPress={toggleModal}
        onBackButtonPress={toggleModal}>
        <View
          style={{
            backgroundColor: '#15181D',
            height: RPH(30),
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 80,
              height: 80,
              margin: 5,
              borderColor: '#8899AA',
              borderWidth: 3,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: isAlreadyInUserWatchList
                ? '#8899AA'
                : 'transparent',
            }}>
            <Text
              onPress={
                currentUser
                  ? () => {
                      isAlreadyInUserFav
                        ? handleRemoveFromWatchList(movie?.id!)
                        : handleAddToWatchList(movie?.id!);
                      toggleModal();
                      showToast();
                    }
                  : () => {
                      toggleModal();
                    }
              }
              style={{
                color: isAlreadyInUserWatchList ? '#15181D' : '#8899AA',
                fontSize: 40,
                fontWeight: 'bold',
              }}>
              ✚
            </Text>
          </View>
          <View
            style={{
              width: 50,
              height: 50,
              margin: 5,
            }}></View>
          <View
            style={{
              width: 80,
              height: 80,
              margin: 5,
              borderColor: '#8899AA',
              borderWidth: 3,
              borderRadius: 50,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: isAlreadyInUserFav ? '#8899AA' : 'transparent',
            }}>
            <Text
              onPress={
                currentUser
                  ? () => {
                      isAlreadyInUserFav
                        ? handleRemoveFromFav(movie?.id!)
                        : handleAddToFav(movie?.id!);
                      toggleModal();
                      showToast();
                    }
                  : () => {
                      toggleModal();
                    }
              }
              style={{
                color: isAlreadyInUserFav ? '#15181D' : '#8899AA',
                fontSize: 40,
                fontWeight: 'bold',
              }}>
              ♥
            </Text>
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
};

export default ScreenHeader;
