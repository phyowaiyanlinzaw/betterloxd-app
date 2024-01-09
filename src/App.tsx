import React from 'react';
import AppStackNavigator from './navigations/AppStackNavigator';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClientProvider} from '@tanstack/react-query';
import queryClient from './libs/reactquery/queryClient';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store, {persistor} from './redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import Toast, {BaseToast} from 'react-native-toast-message';
import {ToastProvider} from 'react-native-toast-notifications';

const App = () => {
  return (
    <ToastProvider>
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <SafeAreaProvider
              style={{
                backgroundColor: '#1B2126',
              }}>
              <NavigationContainer>
                <AppStackNavigator />
              </NavigationContainer>
            </SafeAreaProvider>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </ToastProvider>
  );
};

export default App;
