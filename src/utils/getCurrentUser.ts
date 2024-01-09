import {storage} from '@/db/storage';
import {User} from '@/types/userType';
import AsyncStorage from '@react-native-async-storage/async-storage';

const getUser = () => {
  const userString = storage.getString('currentUser');
  const currentUser: User = userString ? JSON.parse(userString) : null;
  return currentUser;
};

const currentUser = getUser();

export default currentUser;
