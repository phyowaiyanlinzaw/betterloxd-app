import {Dimensions} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated from 'react-native-reanimated';

export const getDetailsScreenConst = () => {
  const formatter = Intl.NumberFormat('en-IN');

  const AnimatedLinearGradient =
    Animated.createAnimatedComponent(LinearGradient);

  const posterSize = Dimensions.get('screen').height / 2;
  const headerTop = 44 - 16;

  return {
    formatter,
    AnimatedLinearGradient,
    posterSize,
    headerTop,
  };
};
