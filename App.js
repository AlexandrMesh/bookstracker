import 'react-native-gesture-handler';
import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Books from './src/screens/Books';
import ToRead from './src/screens/ToRead';

const Tab = createBottomTabNavigator();

const App = () => (
  <NavigationContainer>
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => <Text>{route.name}</Text>,
      })}>
      <Tab.Screen name="Books" component={Books} options={{title: 'Books'}} />
      <Tab.Screen name="ToRead" component={ToRead} />
    </Tab.Navigator>
  </NavigationContainer>
);

export default App;
