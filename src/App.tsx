import React from 'react';
import AppStackNavigator from './navigations/AppStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './libs/reactquery/queryClient';

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppStackNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
};

export default App;
