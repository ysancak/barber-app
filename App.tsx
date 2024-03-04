import React from 'react';
import {StatusBar} from 'react-native';
import Toast from 'react-native-toast-message';
import {Provider} from 'react-redux';

import '@/locale/i18n.config';
import {PersistGate} from 'redux-persist/integration/react';

import AlertController from '@/components/Alert';
import AdminMainNavigator from '@/router/Admin/MainNavigator';
import {store, persistor} from '@/store';
import toastConfig from '@/utils/toast/config';

function App(): JSX.Element {
  return (
    <>
      <StatusBar
        backgroundColor="transparent"
        translucent={true}
        barStyle={'dark-content'}
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AdminMainNavigator />
          <Toast config={toastConfig} />
          <AlertController />
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
