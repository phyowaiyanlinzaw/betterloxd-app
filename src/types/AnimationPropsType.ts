import {SharedValue} from 'react-native-reanimated';

export type AnimationProps = {
  sv: SharedValue<number>;
  posterPath?: string;
  backdropPath?: string;
  movieTitle?: string;
  onBackNav?: () => void;
};
