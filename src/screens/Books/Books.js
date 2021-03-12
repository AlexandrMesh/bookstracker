import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  TextInput,
  Text,
  Button,
  VirtualizedList,
  Image,
  Pressable,
  TouchableOpacity,
  Modal,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
// eslint-disable-next-line import/no-unresolved
import CheckBox from '@react-native-community/checkbox';
import useDebouncedSearch from '../../hooks/useDebouncedSearch';
import styles from './styles';

const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(message, ToastAndroid.SHORT, ToastAndroid.BOTTOM, 25, 50);
  }
  return null;
};

const Books = ({
  navigation,
  bookList,
  getBookList,
  addBookToList,
  isAddBookToListLoading,
  isBooksLoading,
  setIsBooksLoading,
  filterCategoryIds,
  addBookCategoryIdToFilter,
  removeBookCategoryIdFromFilter,
}) => {
  const [page, setPage] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [bookType, setBookType] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchQuery, handleChangeQuery] = useDebouncedSearch(setSearchText, searchText, 400);
  const bookId = useRef('');
  const shouldStartSearch = useRef(false);
  const bookPage = useRef(0);
  const listRef = useRef(null);

  const replaceBooks = async () => {
    bookPage.current = 0;
    if (shouldStartSearch.current) {
      setIsBooksLoading(true);
      listRef.current && listRef.current.scrollToIndex({ animated: false, index: 0 });
      await getBookList({ page: bookPage.current, title: searchText, bookCategoryIds: filterCategoryIds }, true);
      setIsBooksLoading(false);
    }
  };

  useEffect(() => {
    getBookList(
      searchText
        ? { page: bookPage.current, title: searchText, bookCategoryIds: filterCategoryIds }
        : { page: bookPage.current, bookCategoryIds: filterCategoryIds },
    );
  }, [page]);

  useEffect(() => {
    replaceBooks();
  }, [searchText, handleChangeQuery]);

  // useFocusEffect(
  //   useCallback(() => {
  //     console.log(page, 'page');
  //     getData({ page });
  //   }, [page]),
  // );

  const getItem = (booksList, index) => ({
    id: booksList[index]._id,
    title: booksList[index].title,
    categoryId: booksList[index].categoryId,
    coverPath: booksList[index].coverPath,
    rating: booksList[index].rating,
    type: booksList[index].type,
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
      <Text>
        Категория:
        {item.categoryId}
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

  const handleChangeText = (text) => {
    shouldStartSearch.current = true;
    handleChangeQuery(text);
  };

  return (
    <View style={styles.container}>
      {isBooksLoading && (
        <View style={styles.spinner}>
          <ActivityIndicator color="blue" size="large" />
        </View>
      )}
      <TextInput style={{ height: 40, borderColor: 'gray', borderWidth: 1 }} onChangeText={handleChangeText} value={searchQuery} />
      <Button title="Category" onPress={() => setCategoryModalVisible(true)} />
      {bookList.length > 0 && (
        <VirtualizedList
          ref={listRef}
          initialNumToRender={5}
          getItemCount={() => bookList.length}
          getItem={getItem}
          data={bookList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          onEndReached={() => {
            bookList.length > 4 && setPage(page + 1);
            bookPage.current += 1;
          }}
          onEndReachedThreshold={0.5}
        />
      )}
      <Toast visible message="Example" />
      <Button title="Next page" onPress={() => setPage(page + 1)} />
      <Modal animationType="slide" visible={modalVisible} onRequestClose={() => setModalVisible(!modalVisible)}>
        {isAddBookToListLoading && (
          <View style={styles.spinner}>
            <ActivityIndicator color="blue" size="large" />
          </View>
        )}
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <Text>Добавить книгу</Text>
              <TouchableOpacity activeOpacity={0.8} onPress={() => setBookType('customPlannedBooks')}>
                <View style={[styles.modalItem, bookType === 'customPlannedBooks' ? styles.active : '']}>
                  <Text style={styles.modalItemText}>Хочу прочитать</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={() => setBookType('customInProgressBooks')}>
                <View style={[styles.modalItem, bookType === 'customInProgressBooks' ? styles.active : '']}>
                  <Text style={styles.modalItemText}>Читаю</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity activeOpacity={0.8} onPress={() => setBookType('customCompletedBooks')}>
                <View style={[styles.modalItem, bookType === 'customCompletedBooks' ? styles.active : '']}>
                  <Text style={styles.modalItemText}>Прочитал</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.controlButtons}>
            <View style={styles.controlButton}>
              <Button
                title="Save"
                onPress={async () => {
                  await addBookToList({ bookId: bookId.current });
                  setModalVisible(false);
                }}
              />
            </View>
            <View style={styles.controlButton}>
              <Button title="Hide" onPress={() => setModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>

      <Modal animationType="slide" visible={categoryModalVisible} onRequestClose={() => setCategoryModalVisible(!categoryModalVisible)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <Text>Категория</Text>
              <View style={styles.selectCategory}>
                <CheckBox
                  disabled={false}
                  value={filterCategoryIds.includes('11')}
                  onValueChange={(newValue) => {
                    if (newValue) {
                      addBookCategoryIdToFilter('11');
                    } else {
                      removeBookCategoryIdFromFilter('11');
                    }
                  }}
                />
                <Text>11</Text>
              </View>
              <View style={styles.selectCategory}>
                <CheckBox
                  disabled={false}
                  value={filterCategoryIds.includes('12')}
                  onValueChange={(newValue) => {
                    if (newValue) {
                      addBookCategoryIdToFilter('12');
                    } else {
                      removeBookCategoryIdFromFilter('12');
                    }
                  }}
                />
                <Text>12</Text>
              </View>
            </View>
          </View>
          <View style={styles.controlButtons}>
            <View style={styles.controlButton}>
              <Button
                title="Save"
                onPress={async () => {
                  shouldStartSearch.current = true;
                  replaceBooks();
                  setCategoryModalVisible(false);
                }}
              />
            </View>
            <View style={styles.controlButton}>
              <Button title="Hide" onPress={() => setCategoryModalVisible(false)} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

Books.propTypes = {
  getBookList: PropTypes.func.isRequired,
  addBookToList: PropTypes.func.isRequired,
  setIsBooksLoading: PropTypes.func.isRequired,
  addBookCategoryIdToFilter: PropTypes.func.isRequired,
  removeBookCategoryIdFromFilter: PropTypes.func.isRequired,
  filterCategoryIds: PropTypes.string.isRequired,
  bookList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      categoryId: PropTypes.number,
      coverPath: PropTypes.string,
      rating: PropTypes.number,
      type: PropTypes.string,
    }),
  ).isRequired,
  isAddBookToListLoading: PropTypes.bool.isRequired,
  isBooksLoading: PropTypes.bool.isRequired,
};

export default Books;
