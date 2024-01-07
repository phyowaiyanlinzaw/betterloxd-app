import {storage} from '@/db/storage';
import {User} from '@/types/userType';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

// const jsonUser = storage.getString('currentUser');
// const currentUser: User = JSON.parse(jsonUser?.toString() || '{}');

// const currentUser: User = JSON.parse(jsonUser?.toString() || '{}');

export const getUser = async () => {
  const jsonUser = await AsyncStorage.getItem('currentUser').then(user => {
    return user;
  });
  const currentUser: User = JSON.parse(jsonUser?.toString() || '{}');
  return currentUser;
};

const currentUser = getUser();

export default currentUser;
