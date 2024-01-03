import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RootStackParamsList, RootStackProps} from '@/types/navigationType';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

type Props = RootStackProps<'TestScreen'>;

const TestScreen = () => {
  const [initializing, setInitializing] = useState(true);
  const [testUser, setTestUser] = useState<FirebaseAuthTypes.User | null>(null);
  function onAuthStateChanged(testUser: any) {
    setTestUser(testUser);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  if (initializing) return null;

  if (!testUser) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            color: 'white',
            fontSize: 30,
          }}>
          Login
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 30,
        }}>
        Welcome {testUser.email}
      </Text>
    </View>
  );
};

export default TestScreen;
