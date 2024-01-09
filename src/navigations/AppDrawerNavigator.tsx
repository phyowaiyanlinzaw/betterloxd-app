import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {HomeDrawerParamsList} from '@/types/navigationType';
import HomeScreen from '@/screens/HomeScreen';
import SearchScreen from '@/screens/SearchScreen';
import ProfileScreen from '@/screens/ProfileScreen';

import {storage} from '@/db/storage';
import {useAppDispatch, useAppSelector} from '@/redux/hook/hook';
import {logout} from '@/redux/features/userSlice';

const Drawer = createDrawerNavigator<HomeDrawerParamsList>();

const AppDrawerNavigator = () => {
  const currentUser = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const deleteUser = () => {
    storage.delete('currentUser');
  };
  return (
    <Drawer.Navigator
      screenOptions={{
        headerTitle: 'Betterloxd',
        headerTintColor: '#8899AA',
        drawerActiveTintColor: '#8899AA',
        drawerStyle: {
          backgroundColor: '#15181D',
        },
        drawerLabelStyle: {
          fontWeight: 'bold',
        },
        drawerInactiveTintColor: '#8899AA',
        headerShadowVisible: false,
      }}>
      <Drawer.Screen
        name={'Home'}
        component={HomeScreen}
        options={{
          headerStyle: {
            backgroundColor: '#1B2126',
          },
        }}
      />
      <Drawer.Screen
        name={'Search'}
        component={SearchScreen}
        options={{
          headerStyle: {
            backgroundColor: '#1B2126',
          },
        }}
      />
      <Drawer.Screen
        name={'Profile'}
        component={ProfileScreen}
        options={({navigation}) => ({
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: '#1B2126',
          },
          headerRight: () => {
            return (
              <View
                style={{
                  marginRight: 10,
                }}>
                <Pressable
                  onPress={() => {
                    // currentUser.isLoggedInBefore = false;
                    dispatch(logout());
                    deleteUser();
                    navigation.reset({
                      index: 0,
                      routes: [{name: 'LoginScreen'}],
                    });
                  }}>
                  <Text
                    style={{
                      color: '#8899AA',
                      fontSize: 15,
                      fontWeight: 'bold',
                    }}>
                    Log Out
                  </Text>
                </Pressable>
              </View>
            );
          },
        })}
      />
    </Drawer.Navigator>
  );
};

export default AppDrawerNavigator;
