import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Platform, LayoutAnimation, UIManager, View, Text, Button, VirtualizedList, Image, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BookStatusSlideMenu from '../BookStatusSlideMenu';
import styles from './styles';

const layoutAnimConfig = {
  duration: 300,
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
  delete: {
    duration: 100,
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

const BookList = ({ bookList, loadBookList, searchText, updateUserBook, bookListStatus, filterParams, sortParams, removeBook, hasNextPage }) => {
  const navigation = useNavigation();
  const [slideMenuVisibility, setSlideMenuVisibility] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const listRef = useRef(null);
  const bookPage = useRef(0);

  const hideSlideMenu = () => setSlideMenuVisibility(false);

  const showSlideMenu = () => setSlideMenuVisibility(true);

  const getItem = (booksList, index) => ({
    bookId: booksList[index].bookId,
    title: booksList[index].title,
    categoryId: booksList[index].categoryId,
    coverPath: booksList[index].coverPath,
    rating: booksList[index].rating,
    bookStatus: booksList[index].bookStatus,
    added: booksList[index].added,
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
      <Pressable onPress={() => navigation.navigate('BookDetails', { bookId: item.id, title: item.title })}>
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
      <Text>
        Добавлено:
        {item.added}
      </Text>

      <Button
        title="remove"
        onPress={() => {
          removeBook(item.bookId, bookListStatus);
          LayoutAnimation.configureNext(layoutAnimConfig);
        }}
      />

      <Button
        title={item.bookStatus || 'to read'}
        onPress={() => {
          showSlideMenu();
          setSelectedBook(item);
        }}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {bookList.length > 0 && (
        <VirtualizedList
          ref={listRef}
          initialNumToRender={5}
          getItemCount={() => bookList.length}
          getItem={getItem}
          data={bookList}
          renderItem={renderItem}
          keyExtractor={(item) => item.bookId}
          onEndReached={() => {
            if (bookList.length > 4 && hasNextPage) {
              bookPage.current += 1;
              loadBookList(
                {
                  title: searchText,
                  page: bookPage.current,
                  bookListStatus,
                  categoryIds: (filterParams || {}).categoryIds,
                  sortType: (sortParams || {}).type,
                  sortDirection: (sortParams || {}).direction,
                },
                true,
              );
            }
          }}
          onEndReachedThreshold={0.5}
        />
      )}
      <BookStatusSlideMenu
        book={selectedBook}
        updateUserBook={updateUserBook}
        isVisible={slideMenuVisibility}
        onClose={hideSlideMenu}
        bookListStatus={bookListStatus}
      />
    </View>
  );
};

BookList.propTypes = {
  bookList: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      title: PropTypes.string,
      categoryId: PropTypes.number,
      coverPath: PropTypes.string,
      rating: PropTypes.number,
      status: PropTypes.string,
      added: PropTypes.number,
    }),
  ).isRequired,
  sortParams: PropTypes.shape({
    type: PropTypes.string,
    direction: PropTypes.string,
  }).isRequired,
  loadBookList: PropTypes.func.isRequired,
  searchText: PropTypes.string.isRequired,
  updateUserBook: PropTypes.func.isRequired,
  bookListStatus: PropTypes.string.isRequired,
  filterParams: PropTypes.string.isRequired,
  removeBook: PropTypes.func.isRequired,
  hasNextPage: PropTypes.bool.isRequired,
};

export default BookList;
