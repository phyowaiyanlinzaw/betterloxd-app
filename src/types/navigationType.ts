import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamsList = {
  HomeScreen: undefined;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ProfileScreen: undefined;
  DetailsScreen: undefined;
};

export type RootStackProps<T extends keyof RootStackParamsList> =
  NativeStackScreenProps<RootStackParamsList, T>;
