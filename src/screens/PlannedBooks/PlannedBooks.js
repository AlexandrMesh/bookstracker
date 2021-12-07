import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Button, VirtualizedList, Image, Pressable } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import bookListTypes from '../../constants/bookListTypes';
import SlideMenu from '../../UI/SlideMenu';
import RadioButton from '../../UI/RadioButton';
import styles from './styles';

const PlannedBooks = ({ navigation, plannedBookList, getPlannedBookList, updateUserBook, shouldReloadPlannedBookList }) => {
  const [page, setPage] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const bookId = useRef('');
  const isFocused = useIsFocused();
  const [bookType, setBookType] = useState('');

  const actionTypes = [
    { title: 'Хочу прочитать', isSelected: bookType === bookListTypes.PLANNED, action: () => setBookType(bookListTypes.PLANNED) },
    { title: 'Читаю', isSelected: bookType === bookListTypes.IN_PROGRESS, action: () => setBookType(bookListTypes.IN_PROGRESS) },
    { title: 'Прочитал', isSelected: bookType === bookListTypes.COMPLETED, action: () => setBookType(bookListTypes.COMPLETED) },
  ];

  useEffect(() => {
    !shouldReloadPlannedBookList && getPlannedBookList({ page });
  }, [page]);

  useEffect(() => {
    if (isFocused && shouldReloadPlannedBookList) {
      setPage(0);
      getPlannedBookList({ page: 0 });
    }
  }, [shouldReloadPlannedBookList, isFocused]);

  const getItem = (plannedBookList, index) => ({
    id: plannedBookList[index]._id,
    title: plannedBookList[index].title,
    coverPath: plannedBookList[index].coverPath,
    rating: plannedBookList[index].rating,
    type: plannedBookList[index].type,
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
        title={item.type || 'to read'}
        onPress={() => {
          bookId.current = item.id;
          setBookType(item.type);
          setModalVisible(true);
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
      <SlideMenu
        isVisible={modalVisible}
        title="Добавить в список"
        resetTitle={bookType ? 'Сброс' : ''}
        onReset={() => setBookType('')}
        onClose={() => setModalVisible(false)}>
        {actionTypes.map((item) => (
          <Pressable
            key={item.title}
            style={{
              borderColor: '#999',
              paddingLeft: 15,
              paddingRight: 15,
              paddingBottom: 10,
              paddingTop: 10,
              borderTopWidth: 1,
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
            onPress={item.action}>
            <Text style={{ fontSize: 16 }}>{item.title}</Text>
            <RadioButton isSelected={item.isSelected} />
          </Pressable>
        ))}
        <Button
          title="Save"
          onPress={async () => {
            await updateUserBook({ bookId: bookId.current, bookType });
            setModalVisible(false);
          }}
        />
      </SlideMenu>
    </View>
  );
};

PlannedBooks.propTypes = {
  getPlannedBookList: PropTypes.func.isRequired,
  updateUserBook: PropTypes.func.isRequired,
  plannedBookList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      coverPath: PropTypes.string,
      rating: PropTypes.number,
      type: PropTypes.string,
    }),
  ).isRequired,
  shouldReloadPlannedBookList: PropTypes.bool.isRequired,
};

export default PlannedBooks;
