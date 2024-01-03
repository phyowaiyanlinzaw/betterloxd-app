import {AnimationProps} from '@/types/AnimationPropsType';
import {getDetailsScreenConst} from '@/utils/getDetailsScreenConst';
import React, {FC, useState} from 'react';
import {Text, View} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import tailwind from 'twrnc';
import Modal from 'react-native-modal';
import {AddIcon, HeartIcon} from '@/assets/icons';
// import useAddToFav from '@/hooks/useAddToFav';
import {useMutation} from '@tanstack/react-query';
import {addToFav, addToWatchList} from '@/api/usersApi';
import currentUser from '@/utils/getCurrentUser';
import queryClient from '@/libs/reactquery/queryClient';
import useGetUserFavMovies from '@/hooks/useGetUserFavMovies';
import useGetUserWatchList from '@/hooks/useGetUserWatchList';

const ScreenHeader: FC<AnimationProps> = ({sv, movie, onBackNav}) => {
  const inset = useSafeAreaInsets();
  const {formatter, AnimatedLinearGradient, posterSize, headerTop} =
    getDetailsScreenConst();
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

  // const {addToFav} = useAddToFav();

  const {handleAddToFav} = useGetUserFavMovies();
  const {handleAddToWatchList} = useGetUserWatchList();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
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
            height: 150,

            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View
            style={{
              width: 50,
              height: 50,
              margin: 5,
            }}>
            <AddIcon
              onPress={
                currentUser
                  ? () => {
                      handleAddToWatchList(movie?.id!);
                      toggleModal();
                    }
                  : () => {
                      toggleModal();
                    }
              }
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>
          <View
            style={{
              width: 50,
              height: 50,
              margin: 5,
            }}></View>
          <View
            style={{
              width: 50,
              height: 50,
              margin: 5,
            }}>
            <HeartIcon
              onPress={
                currentUser
                  ? () => {
                      handleAddToFav(movie?.id!);
                      toggleModal();
                    }
                  : () => {
                      toggleModal();
                    }
              }
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </View>
        </View>
      </Modal>
    </Animated.View>
  );
};

export default ScreenHeader;
