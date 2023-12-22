import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@/screens/HomeScreen';
import {RootStackParamsList} from '@/types/navigationType';
import DetailsScreen from '@/screens/DetailsScreen';
import AppDrawerNavigator from './AppDrawerNavigator';

const Stack = createNativeStackNavigator<RootStackParamsList>();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'HomeScreen'} component={AppDrawerNavigator} />
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
    </Stack.Navigator>
  );
};

export default AppStackNavigator;
