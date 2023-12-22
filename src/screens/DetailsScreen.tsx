import {View, Text} from 'react-native';
import React, {FC} from 'react';
import {RootStackParamsList, RootStackProps} from '@/types/navigationType';

type DetailsScreenProps = RootStackProps<'DetailsScreen'>;

const DetailsScreen: FC<DetailsScreenProps> = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#1B2126',
        justifyContent: 'center',
        alignItems: 'center',
      }}></View>
  );
};

export default DetailsScreen;
