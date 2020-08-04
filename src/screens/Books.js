import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList } from 'react-native';
import DataService from '../http/services/data';

const Books = ({ navigation }) => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    DataService()
      .getData({ page: 1 })
      .then(({ data }) => {
        setBooks(data);
      });
  }, []);
  const renderItem = ({ item }) => <Text>{item.title}</Text>;
  return (
    <View>
      <Text>Book screen</Text>
      <Button title="Go to read" onPress={() => navigation.navigate('ToRead')} />
      <FlatList data={books} renderItem={renderItem} keyExtractor={(item) => item._id} />
    </View>
  );
};

export default Books;
