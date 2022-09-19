import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import { GoogleSignin } from '@react-native-community/google-signin';
import i18n from './src/translations/i18n';
import configureStore from './src/redux/store/configureStore';
import Main from './src/screens/Main';

GoogleSignin.configure({
  offlineAccess: true,
  webClientId: '424932684716-m79mq3d4akt2gft7plia6r5keaos68t1.apps.googleusercontent.com',
});

const App = () => (
  <I18nextProvider i18n={i18n}>
    <Provider store={configureStore}>
      <Main />
    </Provider>
  </I18nextProvider>
);

export default App;
