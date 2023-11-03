import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';

import '@/locale/i18n.config';
import {PersistGate} from 'redux-persist/integration/react';

import MainNavigator from '@/router/MainNavigator';
import {store, persistor} from '@/store';
import toastConfig from '@/utils/toast/config';

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar
          backgroundColor="transparent"
          translucent={true}
          barStyle={'dark-content'}
        />
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
        <Toast config={toastConfig} />
      </PersistGate>
    </Provider>
  );
}

export default App;
