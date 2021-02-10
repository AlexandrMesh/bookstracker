import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, VirtualizedList, Image, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    justifyContent: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
  },
  container: {
    flex: 1,
  },
  cover: {
    height: 225,
  },
});

const Books = ({ navigation, data, getData }) => {
  const [page, setPage] = useState(0);

  useFocusEffect(
    useCallback(() => {
      getData({ page });
    }, [page]),
  );

  const getItem = (data, index) => {
    console.log(data, 'data');
    return {
      id: data[index]._id,
      title: data[index].title,
      coverPath: data[index].coverPath,
    };
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image
        style={styles.cover}
        resizeMode="contain"
        source={{
          uri: `https://omegaprokat.ru/images/${item.coverPath}`,
        }}
      />
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text>Book screen</Text>
      <Button title="Go to read" onPress={() => navigation.navigate('ToRead')} />
      {data.length > 0 && (
        <VirtualizedList
          initialNumToRender={5}
          getItemCount={() => data.length}
          getItem={getItem}
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReached={() => setPage(page + 1)}
          onEndReachedThreshold={3}
        />
      )}
      <Button title="Next page" onPress={() => setPage(page + 1)} />
    </View>
  );
};

Books.propTypes = {
  getData: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      coverPath: PropTypes.string,
    }),
  ).isRequired,
};

export default Books;
