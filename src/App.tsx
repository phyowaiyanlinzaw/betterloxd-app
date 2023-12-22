import React from 'react';
import AppStackNavigator from './navigations/AppStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './libs/reactquery/queryClient';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NavigationContainer>
          <AppStackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </QueryClientProvider>
  );
};

export default App;
