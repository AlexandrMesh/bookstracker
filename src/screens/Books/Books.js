import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, TextInput, Text, Button, VirtualizedList, Image, Pressable, Modal, ToastAndroid, ActivityIndicator } from 'react-native';
// eslint-disable-next-line import/no-unresolved
import bookListTypes from '../../constants/bookListTypes';
import CheckBox from '../../UI/CheckBox';
import RadioButton from '../../UI/RadioButton';
import SlideMenu from '../../UI/SlideMenu';
import useDebouncedSearch from '../../hooks/useDebouncedSearch';
import styles from './styles';

// Sorting:

// asc
// desc

// Title (По алфавиту)
// Rating (По рейтингу)
// Date added (По дате добавления)
// Date created (По году выхода)

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
  updateUserBook,
  isBooksLoading,
  setIsBooksLoading,
  filterCategoryIds,
  addBookCategoryIdToFilter,
  removeBookCategoryIdFromFilter,
}) => {
  const [page, setPage] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [categoryModalVisible, setCategoryModalVisible] = useState(false);
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  const [bookType, setBookType] = useState('');
  const [searchText, setSearchText] = useState('');
  const [sortDirection, setSortDirection] = useState(1);
  const [sortType, setSortType] = useState('title');

  const [searchQuery, handleChangeQuery] = useDebouncedSearch(setSearchText, searchText, 400);
  const bookId = useRef('');
  const shouldReplaceBooks = useRef(false);
  const bookPage = useRef(0);
  const listRef = useRef(null);

  const actionTypes = [
    { title: 'Хочу прочитать', isSelected: bookType === bookListTypes.PLANNED, action: () => setBookType(bookListTypes.PLANNED) },
    { title: 'Читаю', isSelected: bookType === bookListTypes.IN_PROGRESS, action: () => setBookType(bookListTypes.IN_PROGRESS) },
    { title: 'Прочитал', isSelected: bookType === bookListTypes.COMPLETED, action: () => setBookType(bookListTypes.COMPLETED) },
  ];

  const sortDirections = [
    { title: 'Сначала большие', isSelected: sortDirection === 1, action: () => setSortDirection(1) },
    { title: 'Сначала меньшие', isSelected: sortDirection === -1, action: () => setSortDirection(-1) },
  ];

  const sortTypes = [
    { title: 'По алфавиту', isSelected: sortType === 'title', action: () => setSortType('title') },
    { title: 'По рейтингу', isSelected: sortType === 'rating', action: () => setSortType('rating') },
    { title: 'По дате добавления', isSelected: sortType === 'createdDate', action: () => setSortType('createdDate') },
    { title: 'По году выхода', isSelected: sortType === 'year', action: () => setSortType('year') },
  ];

  const replaceBooks = async () => {
    bookPage.current = 0;
    if (shouldReplaceBooks.current) {
      setIsBooksLoading(true);
      listRef.current && listRef.current.scrollToIndex({ animated: false, index: 0 });
      await getBookList(
        {
          page: bookPage.current,
          title: searchText,
          bookCategoryIds: filterCategoryIds,
          sortBy: sortType,
          sortDirection,
        },
        true,
      );
      setIsBooksLoading(false);
    }
  };

  useEffect(() => {
    getBookList(
      searchText
        ? { page: bookPage.current, title: searchText, bookCategoryIds: filterCategoryIds, sortBy: sortType, sortDirection }
        : { page: bookPage.current, bookCategoryIds: filterCategoryIds, sortBy: sortType, sortDirection },
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
      <Pressable onPress={() => navigation.navigate('Book', { id: item.id, title: item.title })}>
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
    shouldReplaceBooks.current = true;
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
      <Button title="Filter" onPress={() => setFilterModalVisible(true)} />

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

      <Modal animationType="slide" visible={categoryModalVisible} onRequestClose={() => setCategoryModalVisible(!categoryModalVisible)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View>
              <Text>Категория</Text>
              <Pressable
                onPress={() => (filterCategoryIds.includes('11') ? removeBookCategoryIdFromFilter('11') : addBookCategoryIdToFilter('11'))}
                style={styles.selectCategory}>
                <CheckBox
                  isChecked={filterCategoryIds.includes('11')}
                  onChange={() => (filterCategoryIds.includes('11') ? removeBookCategoryIdFromFilter('11') : addBookCategoryIdToFilter('11'))}
                />
                <Text>11</Text>
              </Pressable>
              <View style={styles.selectCategory}>
                <CheckBox isChecked={filterCategoryIds.includes('12')} />
                <Text>12</Text>
              </View>
            </View>
          </View>
          <View style={styles.controlButtons}>
            <View style={styles.controlButton}>
              <Button
                title="Save"
                onPress={async () => {
                  shouldReplaceBooks.current = true;
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

      <SlideMenu isVisible={filterModalVisible} title="Сортировать" onClose={() => setFilterModalVisible(false)}>
        <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 15, marginBottom: 5 }}>Направление:</Text>
        {sortDirections.map((item) => (
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

        <Text style={{ fontSize: 16, fontWeight: 'bold', marginLeft: 15, marginBottom: 5 }}>Тип:</Text>
        {sortTypes.map((item) => (
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
          title="Sort"
          onPress={() => {
            shouldReplaceBooks.current = true;
            replaceBooks();
            setFilterModalVisible(false);
          }}
        />
      </SlideMenu>
    </View>
  );
};

Books.propTypes = {
  getBookList: PropTypes.func.isRequired,
  updateUserBook: PropTypes.func.isRequired,
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
  isBooksLoading: PropTypes.bool.isRequired,
};

export default Books;
