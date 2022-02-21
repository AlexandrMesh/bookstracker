import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Text } from 'react-native';
import { IDLE, PENDING } from '../../../constants/loadingStatuses';
import { IN_PROGRESS } from '../../../constants/bookListStatuses';
import BooksList from '../BooksList';

const renderContent = (loadingDataStatus, loadBookList, bookList) => {
  if (loadingDataStatus === IDLE || loadingDataStatus === PENDING) {
    return <ActivityIndicator color="blue" size="large" />;
  }
  if (bookList.length > 0) {
    return <BooksList loadBookList={loadBookList} bookList={bookList} bookListStatus={IN_PROGRESS} />;
  }
  if (bookList.length === 0) {
    return <Text>No results</Text>;
  }
  return undefined;
};

const InProgressBooks = ({ loadingDataStatus, loadBookList, bookList }) => {
  useEffect(() => {
    if (loadingDataStatus === IDLE || loadingDataStatus === PENDING) {
      loadBookList({ page: 0, bookListStatus: IN_PROGRESS });
    }
  }, [loadingDataStatus]);

  return renderContent(loadingDataStatus, loadBookList, bookList);
};

InProgressBooks.propTypes = {
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
};

export default InProgressBooks;
