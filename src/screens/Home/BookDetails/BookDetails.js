import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Button, ScrollView, Text, Pressable, Image } from 'react-native';
import BookStatusSlideMenu from '../BookStatusSlideMenu';
import { ALL } from '../../../constants/bookListStatuses';
import { PENDING, IDLE } from '../../../constants/loadingStatuses';

const getDescription = (annotation) => `${annotation.slice(0, 200)}...`;

const BookDetails = ({ navigation, route, bookDetails, loadBookDetails, loadingDataStatus, clearBookDetails, updateUserBook }) => {
  const [slideMenuVisibility, setSlideMenuVisibility] = useState(false);
  const { bookId } = route.params;

  const hideSlideMenu = () => setSlideMenuVisibility(false);

  const showSlideMenu = () => setSlideMenuVisibility(true);

  useEffect(() => {
    loadBookDetails({ bookId });
    return () => clearBookDetails();
  }, []);

  return loadingDataStatus === PENDING || loadingDataStatus === IDLE ? (
    <View>
      <Text>Loading</Text>
    </View>
  ) : (
    <ScrollView>
      <View style={{ padding: 15 }}>
        <Image
          style={{
            height: 300,
          }}
          resizeMode='contain'
          source={{
            uri: `https://omegaprokat.ru/images/${bookDetails.coverPath}`,
          }}
        />
        <Button title={bookDetails.status || 'to read'} onPress={showSlideMenu} />
        <Pressable onPress={() => navigation.setOptions({ title: 'Updated! as dasd asd asdasdasdasd asd asd asd asdasdasdasd' })}>
          <Text>Book screen</Text>
          <Text>
            Название:
            {bookDetails.title}
          </Text>
          <Text>
            Рейтинг:
            {bookDetails.rating}
          </Text>
          <Text>
            Категория:
            {bookDetails.categoryId}
          </Text>
          <Text>
            ISBN:
            {bookDetails.isbn}
          </Text>
          <Text>
            Страниц:
            {bookDetails.pages}
          </Text>
          <Text>
            Издатель:
            {bookDetails.publisher}
          </Text>
          <Text>
            Год:
            {bookDetails.year}
          </Text>
          <Text>
            Описание:
            {getDescription(bookDetails.annotation)}
          </Text>
        </Pressable>
      </View>
      <BookStatusSlideMenu
        book={bookDetails}
        bookId={bookId}
        updateUserBook={updateUserBook}
        isVisible={slideMenuVisibility}
        bookListStatus={ALL}
        onClose={hideSlideMenu}
        isCalledFromDetails
      />
    </ScrollView>
  );
};

BookDetails.propTypes = {
  route: PropTypes.shape({
    params: {
      id: PropTypes.string,
    },
  }).isRequired,
  bookDetails: PropTypes.shape({
    status: PropTypes.string,
    title: PropTypes.string,
    coverPath: PropTypes.string,
    rating: PropTypes.number,
    categoryId: PropTypes.number,
    isbn: PropTypes.string,
    pages: PropTypes.string,
    publisher: PropTypes.string,
    year: PropTypes.number,
    annotation: PropTypes.string,
  }).isRequired,
  loadBookDetails: PropTypes.func.isRequired,
  loadingDataStatus: PropTypes.string.isRequired,
  clearBookDetails: PropTypes.func.isRequired,
  updateUserBook: PropTypes.func.isRequired,
};

export default BookDetails;
