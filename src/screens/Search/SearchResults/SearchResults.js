import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Text } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import { IDLE, PENDING } from '../../../constants/loadingStatuses';
import { ALL } from '../../../constants/bookListStatuses';
import BooksList from '../../Home/BooksList';

const renderSearchResults = (loadingDataStatus, searchQuery, loadSearchResults, searchResult, hasNextPage) => {
  if (isEmpty(searchQuery)) {
    return <Text>Try to search</Text>;
  }
  if (loadingDataStatus === IDLE || loadingDataStatus === PENDING) {
    return <ActivityIndicator color="blue" size="large" />;
  }
  if (searchResult.length > 0) {
    return (
      <BooksList searchText={searchQuery} bookListStatus={ALL} loadBookList={loadSearchResults} bookList={searchResult} hasNextPage={hasNextPage} />
    );
  }
  if (searchResult.length === 0) {
    return <Text>No results</Text>;
  }
  return undefined;
};

const SearchResults = ({ loadingDataStatus, searchQuery, loadSearchResults, searchResult, hasNextPage }) => {
  useEffect(() => {
    if (!isEmpty(searchQuery)) {
      loadSearchResults({ title: searchQuery, bookListStatus: ALL, page: 0 });
    }
  }, [searchQuery]);

  useEffect(() => {
    console.log('mount');
    return () => console.log('unmount');
  }, []);

  return renderSearchResults(loadingDataStatus, searchQuery, loadSearchResults, searchResult, hasNextPage);
};

SearchResults.propTypes = {
  loadingDataStatus: PropTypes.string.isRequired,
  searchQuery: PropTypes.string.isRequired,
  loadSearchResults: PropTypes.func.isRequired,
  searchResult: PropTypes.arrayOf(
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

export default SearchResults;
