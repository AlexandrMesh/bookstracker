import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Text } from 'react-native';
import { IDLE, PENDING } from '../../../constants/loadingStatuses';
import { PLANNED } from '../../../constants/bookListStatuses';
import BooksList from '../BooksList';

const renderContent = (loadingDataStatus, loadBookList, bookList, hasNextPage) => {
  if (loadingDataStatus === IDLE || loadingDataStatus === PENDING) {
    return <ActivityIndicator color="blue" size="large" />;
  }
  if (bookList.length > 0) {
    return <BooksList loadBookList={loadBookList} bookList={bookList} bookListStatus={PLANNED} hasNextPage={hasNextPage} />;
  }
  if (bookList.length === 0) {
    return <Text>No results</Text>;
  }
  return undefined;
};

const PlannedBooks = ({ loadingDataStatus, loadBookList, bookList, hasNextPage }) => {
  useEffect(() => {
    if (loadingDataStatus === IDLE || loadingDataStatus === PENDING) {
      loadBookList({ page: 0, bookListStatus: PLANNED });
    }
  }, [loadingDataStatus]);

  return renderContent(loadingDataStatus, loadBookList, bookList, hasNextPage);
};

PlannedBooks.propTypes = {
  loadingDataStatus: PropTypes.string.isRequired,
  loadBookList: PropTypes.func.isRequired,
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
  hasNextPage: PropTypes.bool.isRequired,
};

export default PlannedBooks;
