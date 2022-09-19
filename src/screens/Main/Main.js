import React, { useEffect } from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Splash from '../Splash/Splash';
import Home from '../Home';
import SignIn from '../Auth/SignIn';
import SignUp from '../Auth/SignUp';
import Search from '../Search';
import BookDetails from '../Home/BookDetails';
import Profile from '../Profile';
import About from '../Profile/About';
import ResetPassword from '../Auth/ResetPassword';
import CodeVerification from '../Auth/ResetPassword/CodeVerification';
import NewPassword from '../Auth/ResetPassword/NewPassword';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const Main = ({ checkAuth, isChecked, isSignedIn }) => {
  const checkAuthentication = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      await checkAuth(token);
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

  const SearchNavigator = () => (
    <Stack.Navigator>
      <Stack.Screen name='Search' component={Search} options={{ headerShown: false }} />
      <Stack.Screen name='BookDetails' component={BookDetails} />
    </Stack.Navigator>
  );

  const HomeNavigator = () => (
    <Stack.Navigator>
      <Stack.Screen name='Home' component={Home} options={{ headerShown: false }} />
      <Stack.Screen name='BookDetails' component={BookDetails} />
    </Stack.Navigator>
  );

  const ProfileNavigator = () => (
    <Stack.Navigator>
      <Stack.Screen name='Profile' component={Profile} options={{ headerShown: false }} />
      <Stack.Screen name='About' component={About} />
    </Stack.Navigator>
  );

  const Main = () => (
    // eslint-disable-next-line react/display-name
    <Tab.Navigator screenOptions={({ route }) => ({ tabBarIcon: () => <Text>{route.name}</Text> })}>
      <Tab.Screen name='Home' component={HomeNavigator} />
      <Tab.Screen name='Search' component={SearchNavigator} />
      <Tab.Screen name='Profile' component={ProfileNavigator} />
    </Tab.Navigator>
  );

  return (
    <>
      <NavigationContainer>
        {isSignedIn ? (
          <Main />
        ) : (
          <Stack.Navigator>
            <Stack.Screen name='SignIn' component={SignIn} />
            <Stack.Screen name='SignUp' component={SignUp} />
            <Stack.Screen name='ResetPassword' component={ResetPassword} />
            <Stack.Screen name='CodeVerification' component={CodeVerification} />
            <Stack.Screen name='NewPassword' component={NewPassword} />
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
