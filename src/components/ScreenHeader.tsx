import {AnimationProps} from '@/types/AnimationPropsType';
import {getDetailsScreenConst} from '@/utils/getDetailsScreenConst';
import {FC} from 'react';
import {Text} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import tailwind from 'twrnc';

const ScreenHeader: FC<AnimationProps> = ({sv, movieTitle, navigation}) => {
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
          fontSize: 20,
          fontWeight: 'bold',
          padding: 10,
        }}
        onPress={() => {
          navigation.goBack();
        }}>
        Back
      </Text>
      <Animated.Text
        style={{
          color: '#8899AA',
          fontSize: 20,
          fontWeight: 'bold',
          padding: 10,
        }}>
        {movieTitle}
      </Animated.Text>
      <Text
        style={{
          color: '#8899AA',
          fontSize: 20,
          fontWeight: 'bold',
          padding: 10,
        }}>
        Menu
      </Text>
    </Animated.View>
  );
};

export default ScreenHeader;
