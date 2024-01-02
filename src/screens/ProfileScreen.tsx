import {View, Text} from 'react-native';
import React, {FC} from 'react';
import {HomeDrawerProps} from '@/types/navigationType';
import {storage} from '@/db/storage';
import {User} from '@/types/userType';

type Props = HomeDrawerProps<'Profile'>;
type Navigation = Props['navigation'];

const ProfileScreen: FC<Props> = () => {
  const jsonUser = storage.getString('currentUser');
  const currentUser: User = JSON.parse(jsonUser!);
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#15181D',
      }}>
      <Text
        style={{
          color: '#8899AA',
          fontSize: 20,
        }}>
        {currentUser.email}
      </Text>
      <Text
        style={{
          color: '#8899AA',
          fontSize: 20,
        }}>
        {currentUser.password}
      </Text>
    </View>
  );
};

export default ProfileScreen;
