import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamsList} from '@/types/navigationType';
import DetailsScreen from '@/screens/DetailsScreen';

import LogInScreen from '@/screens/LogInScreen';
import AppDrawerNavigator from './AppDrawerNavigator';
import RegisterScreen from '@/screens/RegisterScreen';
import currentUser from '@/utils/getCurrentUser';
import TestScreen from '@/screens/TestScreen';
import {useAppSelector} from '@/redux/hook/hook';

const Stack = createNativeStackNavigator<RootStackParamsList>();

const AppStackNavigator = () => {
  const currentUser = useAppSelector(state => state.user.user);
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: '#15181D',
        },
      }}
      initialRouteName={
        currentUser.isLoggedInBefore ? 'HomeScreen' : 'LoginScreen'
        // 'TestScreen'
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
