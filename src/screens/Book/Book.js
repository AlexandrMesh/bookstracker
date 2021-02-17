import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { View, Text, Pressable } from 'react-native';
import { isEmpty } from 'ramda';

const Book = ({ navigation, route, bookDetails, getBookDetails, isBookDetailsLoading, clearBookDetails }) => {
  const { id } = route.params;

  useEffect(() => {
    getBookDetails({ id });
    return () => clearBookDetails();
  }, []);

  console.log(isBookDetailsLoading, 'isBookDetailsLoading');

  return !isBookDetailsLoading && !isEmpty(bookDetails) ? (
    <View>
      <Pressable onPress={() => navigation.setOptions({ title: 'Updated! as dasd asd asdasdasdasd asd asd asd asdasdasdasd' })}>
        <Text>Book screen</Text>
        <Text>
          Название:
          {bookDetails.title}
        </Text>
      </Pressable>
    </View>
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
  }).isRequired,
  getBookDetails: PropTypes.func.isRequired,
  isBookDetailsLoading: PropTypes.bool.isRequired,
  clearBookDetails: PropTypes.func.isRequired,
};

export default Book;
