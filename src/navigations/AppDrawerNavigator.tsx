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
    <Drawer.Navigator>
      <Drawer.Screen name="Home" component={HomeScreen} />
    </Drawer.Navigator>
  );
};

export default AppDrawerNavigator;
