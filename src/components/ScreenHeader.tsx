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
import {HeartIcon} from '@/assets/icons';

const ScreenHeader: FC<AnimationProps> = ({sv, movieTitle, onBackNav}) => {
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
        {movieTitle}
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
            height: 200,
            width: '100%',
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              padding: 10,
              backgroundColor: '#8899AA',
              borderRadius: 7,
              margin: 5,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 15,
                fontWeight: 'bold',
              }}
              onPress={() => {
                toggleModal();
              }}>
              To Watch
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
              width: 50,
              height: 50,
              margin: 5,
            }}>
            <HeartIcon
              onPress={() => {}}
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
