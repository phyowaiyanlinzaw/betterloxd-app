import {storage} from '@/db/storage';
import {User} from '@/types/userType';

const jsonUser = storage.getString('currentUser');
const currentUser: User = JSON.parse(jsonUser?.toString() || '{}');

export default currentUser;
