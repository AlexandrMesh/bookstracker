import React from 'react';
import { View, Text } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import AllBooks from './AllBooks';
import PlannedBooks from './PlannedBooks';
import InProgressBooks from './InProgressBooks';
import CompletedBooks from './CompletedBooks';
import styles from './styles';

const Tab = createMaterialTopTabNavigator();

const renderLabel = (label) => <Text>{label}</Text>;

const HeaderTabs = () => (
  <Tab.Navigator
    lazy
    tabBarOptions={{
      labelStyle: { fontSize: 5 },
      style: { backgroundColor: 'powderblue' },
      indicatorStyle: { height: 4 },
    }}
  >
    <Tab.Screen name='AllBooks' component={AllBooks} options={{ tabBarLabel: () => renderLabel('Все книги') }} />
    <Tab.Screen name='PlannedBooks' component={PlannedBooks} options={{ tabBarLabel: () => renderLabel('Буду читать') }} />
    <Tab.Screen name='InProgressBooks' component={InProgressBooks} options={{ tabBarLabel: () => renderLabel('Читаю') }} />
    <Tab.Screen name='CompletedBooks' component={CompletedBooks} options={{ tabBarLabel: () => renderLabel('Прочитано') }} />
  </Tab.Navigator>
);

const Home = () => (
  <View style={styles.container}>
    <HeaderTabs />
  </View>
);

export default Home;
