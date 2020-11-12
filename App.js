import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { GoogleSignin } from '@react-native-community/google-signin';
import configureStore from './src/redux/store/configureStore';
import Main from './src/screens/Main';

GoogleSignin.configure({
  offlineAccess: true,
  webClientId: '424932684716-m79mq3d4akt2gft7plia6r5keaos68t1.apps.googleusercontent.com',
});

const App = () => (
  <Provider store={configureStore}>
    <Main />
  </Provider>
);

export default App;
