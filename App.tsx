import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import {store} from '@/store';
import RootNavigator from '@/router/RootNavigator';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <RootNavigator />
      </NavigationContainer>
      <Toast />
    </Provider>
  );
}

export default App;
