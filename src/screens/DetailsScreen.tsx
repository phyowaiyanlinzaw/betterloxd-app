import {View, Text} from 'react-native';
import React, {FC} from 'react';
import {RootStackParamsList, RootStackProps} from '@/types/navigationType';

type DetailsScreenProps = RootStackProps<'DetailsScreen'>;

const DetailsScreen: FC<DetailsScreenProps> = () => {
  return (
    <View>
      <Text>DetailsScreen</Text>
    </View>
  );
};

export default DetailsScreen;
