import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from '../Splash/Splash';
import Books from '../Books';
import Book from '../Book';
import PlannedBooks from '../PlannedBooks';
import SignIn from '../Auth/SignIn';
import ResetPassword from '../Auth/ResetPassword';
import CodeVerification from '../Auth/ResetPassword/CodeVerification';
import NewPassword from '../Auth/ResetPassword/NewPassword';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const RootStack = createStackNavigator();

const Main = ({ checkAuth, isChecked, isSignedIn }) => {
  const checkAuthentication = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      token && (await checkAuth(token));
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    checkAuthentication();
  }, []);

  if (!isChecked) {
    return <Splash />;
  }

  const HomeTabs = () => (
    <Tab.Navigator screenOptions={({ route }) => ({ tabBarIcon: () => <Text>{route.name}</Text> })}>
      <Tab.Screen name="Books" component={Books} />
      <Tab.Screen name="PlannedBooks" component={PlannedBooks} />
    </Tab.Navigator>
  );

  return (
    <>
      <NavigationContainer>
        {isSignedIn ? (
          <RootStack.Navigator>
            <RootStack.Screen name="Home" component={HomeTabs} options={{ headerShown: false }} />
            <RootStack.Screen name="Book" component={Book} />
          </RootStack.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="ResetPassword" component={ResetPassword} />
            <Stack.Screen name="CodeVerification" component={CodeVerification} />
            <Stack.Screen name="NewPassword" component={NewPassword} />
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </>
  );
};

Main.propTypes = {
  checkAuth: PropTypes.func.isRequired,
  isChecked: PropTypes.bool.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
};

export default Main;
