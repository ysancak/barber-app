import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import Toast from 'react-native-toast-message';

import RootNavigator from './src/router/RootNavigator';
import {store} from './src/store';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <SafeAreaView>
        <StatusBar barStyle={'dark-content'} />
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
        <Toast />
      </SafeAreaView>
    </Provider>
  );
}

export default App;
