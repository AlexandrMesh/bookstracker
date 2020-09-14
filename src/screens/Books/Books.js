import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, FlatList } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';

const Books = ({ navigation, data, getData, checkAuth }) => {
  const checkAuthentication = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(token, 'token');
      checkAuth({ token });
      getData({ page: 1 });
    } catch (e) {
      console.error(e);
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkAuthentication();
    }, []),
  );

  const renderItem = ({ item }) => <Text>{item.title}</Text>;
  return (
    <View>
      <Text>Book screen</Text>
      <Button title="Go to read" onPress={() => navigation.navigate('ToRead')} />
      <FlatList data={data} renderItem={renderItem} keyExtractor={(item) => item._id} />
    </View>
  );
};

Books.propTypes = {
  getData: PropTypes.func.isRequired,
  checkAuth: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Books;
