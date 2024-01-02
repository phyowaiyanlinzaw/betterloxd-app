import {DrawerScreenProps} from '@react-navigation/drawer';
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamsList = {
  HomeScreen: NavigatorScreenParams<HomeDrawerParamsList>;
  LoginScreen: undefined;
  RegisterScreen: undefined;
  DetailsScreen: {
    movieId: number;
  };
  SearchScreen: undefined;
  ProfileScreen: undefined;
};

export type HomeDrawerParamsList = {
  Home: undefined;
  Search: undefined;
  Profile: undefined;
  Logout: undefined;
};

export type RootStackProps<T extends keyof RootStackParamsList> =
  NativeStackScreenProps<RootStackParamsList, T>;

export type HomeDrawerProps<T extends keyof HomeDrawerParamsList> =
  CompositeScreenProps<
    DrawerScreenProps<HomeDrawerParamsList, T>,
    RootStackProps<keyof RootStackParamsList>
  >;
