import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@/screens/HomeScreen';
import {RootStackParamsList} from '@/types/navigationType';
import DetailsScreen from '@/screens/DetailsScreen';

import LogInScreen from '@/screens/LogInScreen';
import AppDrawerNavigator from './AppDrawerNavigator';
import {useState} from 'react';
import {Text, TouchableOpacity} from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamsList>();

const AppStackNavigator = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: '#15181D',
        },
      }}
      initialRouteName={isAuthenticated ? 'HomeScreen' : 'LoginScreen'}>
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
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
