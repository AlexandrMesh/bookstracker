import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, VirtualizedList, Image, Pressable, Modal } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import styles from './styles';

const PlannedBooks = ({
  navigation,
  plannedBookList,
  getPlannedBookList,
  addBookToList,
  shouldReloadPlannedBookList,
  setShouldReloadPlannedBookList,
}) => {
  const [page, setPage] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const bookId = useRef('');
  const isFocused = useIsFocused();

  useEffect(() => {
    getPlannedBookList({ page });
  }, [page]);

  useEffect(() => {
    if (isFocused && shouldReloadPlannedBookList) {
      setPage(0);
      setShouldReloadPlannedBookList(false);
    }
  }, [shouldReloadPlannedBookList, isFocused]);

  const getItem = (plannedBookList, index) => ({
    id: plannedBookList[index]._id,
    title: plannedBookList[index].title,
    coverPath: plannedBookList[index].coverPath,
    rating: plannedBookList[index].rating,
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
      {plannedBookList.length > 0 && (
        <VirtualizedList
          initialNumToRender={5}
          getItemCount={() => plannedBookList.length}
          getItem={getItem}
          data={plannedBookList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReached={() => setPage(page + 1)}
          onEndReachedThreshold={0.5}
        />
      )}
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

PlannedBooks.propTypes = {
  getPlannedBookList: PropTypes.func.isRequired,
  addBookToList: PropTypes.func.isRequired,
  plannedBookList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      coverPath: PropTypes.string,
      rating: PropTypes.number,
    }),
  ).isRequired,
  shouldReloadPlannedBookList: PropTypes.bool.isRequired,
  setShouldReloadPlannedBookList: PropTypes.func.isRequired,
};

export default PlannedBooks;
