import {MMKV} from 'react-native-mmkv';

export const storage = new MMKV({
  id: 'user-storage',
  encryptionKey: 'user-encryption-key',
});

storage.set('user.name', 'Phyo Phyo Lay');
storage.set('user.age', 25);
storage.set('user.address', 'Yangon');
storage.set('user.isMarried', false);
storage.set('user.isSingle', true);
storage.set('user.isEmployed', true);
storage.set('user.isUnemployed', false);
