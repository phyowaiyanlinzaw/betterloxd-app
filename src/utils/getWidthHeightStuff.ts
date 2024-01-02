import {Dimensions} from 'react-native';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

const RPH = (percentage: number) => {
  return (percentage / 100) * height;
};
const RPW = (percentage: number) => {
  return (percentage / 100) * width;
};

export const getWidthHeightStuff = () => {
  return {
    width,
    height,
    RPH,
    RPW,
  };
};
