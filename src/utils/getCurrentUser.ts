import {User} from '@/types/userType';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUser = async () => {
  const jsonUser = await AsyncStorage.getItem('currentUser').then(user => {
    return user;
  });
  const currentUser: User = JSON.parse(jsonUser?.toString() || '{}');
  return currentUser;
};

const currentUser = getUser().then(user => {
  return user;
});

export default currentUser;
