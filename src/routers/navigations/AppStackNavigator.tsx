import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamsList} from '../type';
import HomeScreen from '../screens/HomeScreen';

const Stack = createNativeStackNavigator<RootStackParamsList>();

const AppStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
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
