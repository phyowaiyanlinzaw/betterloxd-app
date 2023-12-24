import {styles} from '@/styles/styles';
import {AnimationProps} from '@/types/AnimationPropsType';
import {getDetailsScreenConst} from '@/utils/getDetailsScreenConst';
import React, {FC} from 'react';
import {LayoutChangeEvent} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  Extrapolation,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import tailwind from 'twrnc';

const PosterImage: FC<AnimationProps> = ({sv, posterPath, backdropPath}) => {
  const inset = useSafeAreaInsets();
  const layoutY = useSharedValue(0);
  const {formatter, AnimatedLinearGradient, posterSize, headerTop} =
    getDetailsScreenConst();
  const opacityAnim = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        sv.value,
        [0, posterSize - (headerTop + inset.top) / 0.9],
        [1, 0],
        Extrapolation.CLAMP,
      ),
    };
  });
  const textAnim = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        sv.value,
        [-posterSize / 8, 0, posterSize - (headerTop + inset.top) / 0.8],
        [0, 1, 0],
        Extrapolation.CLAMP,
      ),
      transform: [
        {
          scale: interpolate(
            sv.value,
            [-posterSize / 8, 0, (posterSize - (headerTop + inset.top)) / 2],
            [1.1, 1, 0.95],
            'clamp',
          ),
        },
        {
          translateY: interpolate(
            sv.value,
            [layoutY.value - 1, layoutY.value, layoutY.value + 1],
            [0, 0, -1],
          ),
        },
      ],
    };
  });
  const scaleAnim = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(sv.value, [-50, 0], [1.3, 1], {
            extrapolateLeft: 'extend',
            extrapolateRight: 'clamp',
          }),
        },
      ],
    };
  });
  return (
    <Animated.View style={[styles.imageContainer, opacityAnim]}>
      <Animated.Image
        style={[styles.imageStyle, scaleAnim]}
        src={`https://image.tmdb.org/t/p/original${backdropPath}`}
      />
      <Animated.View
        onLayout={(event: LayoutChangeEvent) => {
          'worklet';
          layoutY.value = event.nativeEvent.layout.y;
        }}
        style={[
          tailwind.style(
            'absolute bottom-0 top-0 left-0 right-0 justify-end items-center px-5  z-10',
          ),
          textAnim,
        ]}>
        <Animated.Image
          style={tailwind.style('w-30 h-40  rounded-2 ')}
          src={`https://image.tmdb.org/t/p/original${posterPath}`}></Animated.Image>
      </Animated.View>
      <AnimatedLinearGradient
        style={[tailwind.style('absolute inset-0'), scaleAnim]}
        colors={[
          `rgba(0,0,0,${0})`,
          `rgba(0,0,0,${0.1})`,
          `rgba(0,0,0,${0.3})`,
          `rgba(0,0,0,${0.5})`,
          `rgba(0,0,0,${0.8})`,
          `rgba(0,0,0,${1})`,
        ]}
      />
    </Animated.View>
  );
};

export default PosterImage;
