import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@/screens/HomeScreen';
import {RootStackParamsList} from '@/types/navigationType';
import DetailsScreen from '@/screens/DetailsScreen';

import LogInScreen from '@/screens/LogInScreen';
import AppDrawerNavigator from './AppDrawerNavigator';
import {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {storage} from '@/db/storage';
import {User} from '@/types/userType';
import RegisterScreen from '@/screens/RegisterScreen';
import useGetUser from '@/hooks/useGetUser';
import {current} from '@reduxjs/toolkit';
import currentUser from '@/utils/getCurrentUser';
import {useQuery} from '@tanstack/react-query';
import {getCurrentUser} from '@/api/usersApi';
import TestScreen from '@/screens/TestScreen';

const Stack = createNativeStackNavigator<RootStackParamsList>();

const AppStackNavigator = () => {
  const jsonUser = storage.getString('currentUser');

  const {data} = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
  });
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: '#15181D',
        },
      }}
      initialRouteName={
        // data?.isLoggedInBefore ? 'HomeScreen' : 'LoginScreen'
        'TestScreen'
      }>
      <Stack.Screen
        name={'HomeScreen'}
        component={AppDrawerNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={({navigation}) => ({
          // headerLeft: () => {
          //   return (
          //     <TouchableOpacity
          //       onPress={() => {
          //         navigation.goBack();
          //       }}
          //       style={{
          //         marginLeft: 10,
          //       }}>
          //       <Text
          //         style={{
          //           fontSize: 18,
          //         }}>
          //         Back
          //       </Text>
          //     </TouchableOpacity>
          //   );
          // },
          headerShown: false,
          headerStyle: {
            backgroundColor: '#15181D',
          },
          headerTitle: 'Betterloxd',
          headerTintColor: '#8899AA',
        })}
      />
      <Stack.Screen
        name={'LoginScreen'}
        component={LogInScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name={'RegisterScreen'}
        component={RegisterScreen}
        options={({navigation}) => ({
          headerShown: false,
        })}
      />
      <Stack.Screen
        name={'TestScreen'}
        component={TestScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
