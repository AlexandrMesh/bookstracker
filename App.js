import 'react-native-gesture-handler';
import React from 'react';
import { Text } from 'react-native';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import configureStore from './src/redux/store/configureStore';
import Books from './src/screens/Books';
import ToRead from './src/screens/ToRead';

const Tab = createBottomTabNavigator();

const App = () => (
  <Provider store={configureStore}>
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({ tabBarIcon: () => <Text>{route.name}</Text> })}>
        <Tab.Screen name="Books" component={Books} options={{ title: 'Books' }} />
        <Tab.Screen name="ToRead" component={ToRead} />
      </Tab.Navigator>
    </NavigationContainer>
  </Provider>
);

export default App;
