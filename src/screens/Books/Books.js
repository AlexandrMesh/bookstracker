import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, FlatList } from 'react-native';

const Books = ({ navigation, data, getData }) => {
  useEffect(() => {
    getData({ page: 1 });
  }, []);

  console.log(data, 'data');

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
  data: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Books;
