import {View, Text, Pressable} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {
  HomeDrawerParamsList,
  RootStackParamsList,
} from '@/types/navigationType';
import HomeScreen from '@/screens/HomeScreen';
import SearchScreen from '@/screens/SearchScreen';
import LogInScreen from '@/screens/LogInScreen';
import ProfileScreen from '@/screens/ProfileScreen';

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
                    navigation.navigate('LoginScreen');
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
