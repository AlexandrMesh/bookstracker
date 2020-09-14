import 'react-native-gesture-handler';
import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GoogleSignin } from '@react-native-community/google-signin';
import configureStore from './src/redux/store/configureStore';
import Books from './src/screens/Books';
import ToRead from './src/screens/ToRead';
import Signin from './src/screens/Auth/Signin';

GoogleSignin.configure({
  offlineAccess: true,
  webClientId: '424932684716-m79mq3d4akt2gft7plia6r5keaos68t1.apps.googleusercontent.com',
});

const Tab = createBottomTabNavigator();

const App = () => (
  <Provider store={configureStore}>
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({ tabBarIcon: () => <Text>{route.name}</Text> })}>
        <Tab.Screen name="Books" component={Books} options={{ title: 'Books' }} />
        <Tab.Screen name="ToRead" component={ToRead} />
        <Tab.Screen name="Signin" component={Signin} />
      </Tab.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
