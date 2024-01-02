import {SharedValue} from 'react-native-reanimated';
import {Movie} from './movieType';

export type AnimationProps = {
  sv: SharedValue<number>;
  posterPath?: string;
  backdropPath?: string;
  movie?: Movie;
  onBackNav?: () => void;
};
