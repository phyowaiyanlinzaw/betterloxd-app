import React from 'react';
import AppStackNavigator from './routers/navigations/AppStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './libs/queryClient';

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
