import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, ScrollView, Text, Pressable, Image } from 'react-native';
import { isEmpty } from 'ramda';

const Book = ({ navigation, route, bookDetails, getBookDetails, isBookDetailsLoading, clearBookDetails }) => {
  const { id, title } = route.params;

  const getDescription = () => {
    const description = bookDetails.annotation;
    if (description.length > 200) {
      return `${bookDetails.annotation.slice(0, 200)}...`;
    }
    return false;
  };

  useEffect(() => {
    navigation.setOptions({ title });
    getBookDetails({ id });
    return () => clearBookDetails();
  }, []);

  console.log(isBookDetailsLoading, 'isBookDetailsLoading');

  return !isBookDetailsLoading && !isEmpty(bookDetails) ? (
    <ScrollView>
      <View style={{ padding: 15 }}>
        <Image
          style={{
            height: 300,
          }}
          resizeMode="contain"
          source={{
            uri: `https://omegaprokat.ru/images/${bookDetails.coverPath}`,
          }}
        />
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
            {getDescription()}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  ) : (
    <View>
      <Text>Loading</Text>
    </View>
  );
};

Book.propTypes = {
  route: PropTypes.shape({
    params: {
      id: PropTypes.string,
    },
  }).isRequired,
  bookDetails: PropTypes.shape({
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
  getBookDetails: PropTypes.func.isRequired,
  isBookDetailsLoading: PropTypes.bool.isRequired,
  clearBookDetails: PropTypes.func.isRequired,
};

export default Book;
