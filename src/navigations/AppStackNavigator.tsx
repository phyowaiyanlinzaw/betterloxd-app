import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '@/screens/HomeScreen';
import {RootStackParamsList} from '@/types/navigationType';

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
