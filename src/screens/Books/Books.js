import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, VirtualizedList, Image, Pressable, Modal } from 'react-native';
import styles from './styles';

const Books = ({ navigation, bookList, getBookList, addBookToList }) => {
  const [page, setPage] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const bookId = useRef('');

  useEffect(() => {
    getBookList({ page });
  }, [page]);

  // useFocusEffect(
  //   useCallback(() => {
  //     console.log(page, 'page');
  //     getData({ page });
  //   }, [page]),
  // );

  const getItem = (booksList, index) => ({
    id: booksList[index]._id,
    title: booksList[index].title,
    coverPath: booksList[index].coverPath,
    rating: booksList[index].rating,
  });

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Image
        style={styles.cover}
        resizeMode="contain"
        source={{
          uri: `https://omegaprokat.ru/images/${item.coverPath}`,
        }}
      />
      <Pressable onPress={() => navigation.navigate('Book', { id: item.id })}>
        <Text>{item.title}</Text>
      </Pressable>
      <Text>
        Рейтинг:
        {item.rating}
      </Text>

      <Button
        title="To Read"
        onPress={() => {
          setModalVisible(true);
          bookId.current = item.id;
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Button title="Go to read" onPress={() => navigation.navigate('ToRead')} />
      {bookList.length > 0 && (
        <VirtualizedList
          initialNumToRender={5}
          getItemCount={() => bookList.length}
          getItem={getItem}
          data={bookList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReached={() => setPage(page + 1)}
        />
      )}
      <Button title="Next page" onPress={() => setPage(page + 1)} />
      <Modal animationType="slide" visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
        <View style={styles.modalContainer}>
          <Text>Добавить книгу</Text>
          <Pressable onPress={() => addBookToList({ bookId: bookId.current })}>
            <View style={styles.modalItem}>
              <Text style={styles.modalItemText}>К прочтению</Text>
            </View>
          </Pressable>
          <Button title="Hide" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
};

Books.propTypes = {
  getBookList: PropTypes.func.isRequired,
  addBookToList: PropTypes.func.isRequired,
  bookList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      coverPath: PropTypes.string,
      rating: PropTypes.number,
    }),
  ).isRequired,
};

export default Books;
