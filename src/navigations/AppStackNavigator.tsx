import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@/screens/HomeScreen';
import {RootStackParamsList} from '@/types/navigationType';
import DetailsScreen from '@/screens/DetailsScreen';

import LogInScreen from '@/screens/LogInScreen';

const Stack = createNativeStackNavigator<RootStackParamsList>();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#15181D',
        },
      }}
      initialRouteName={'LoginScreen'}>
      <Stack.Screen name={'HomeScreen'} component={HomeScreen} />
      <Stack.Screen
        name="DetailsScreen"
        component={DetailsScreen}
        options={{
          headerStyle: {
            backgroundColor: '#15181D',
          },
          headerTitle: 'Betterloxd',
          headerTintColor: '#8899AA',
        }}
      />
      <Stack.Screen name={'LoginScreen'} component={LogInScreen} />
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
