import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  HomeDrawerParamsList,
  RootStackParamsList,
} from '@/types/navigationType';
import HomeScreen from '@/screens/HomeScreen';

const Drawer = createDrawerNavigator<HomeDrawerParamsList>();

const AppDrawerNavigator = () => {
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
    </Drawer.Navigator>
  );
};

export default AppDrawerNavigator;
