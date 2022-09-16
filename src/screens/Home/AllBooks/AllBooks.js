import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Pressable, Text } from 'react-native';
import { IDLE, PENDING } from '../../../constants/loadingStatuses';
import { ALL } from '../../../constants/bookListStatuses';
import Filter from '../Filter';
import Sorting from '../Sorting';
import BooksList from '../BooksList';

const renderContent = (
  loadingDataStatus,
  loadBookList,
  bookList,
  isFilterVisible,
  setIsFilterVIsible,
  filterParams,
  sortingVisibility,
  setSortingVisibility,
  sortParams,
  hasNextPage,
) => {
  if (loadingDataStatus === IDLE || loadingDataStatus === PENDING) {
    return <ActivityIndicator color="blue" size="large" />;
  }
  if (bookList.length > 0) {
    return (
      <>
        <Pressable onPress={() => setIsFilterVIsible(true)}>
          <Text>Фильтр</Text>
        </Pressable>
        <Pressable onPress={() => setSortingVisibility(true)}>
          <Text>Сортировка</Text>
        </Pressable>
        <BooksList
          loadBookList={loadBookList}
          bookListStatus={ALL}
          bookList={bookList}
          filterParams={filterParams}
          sortParams={sortParams}
          hasNextPage={hasNextPage}
        />
        <Filter isVisible={isFilterVisible} bookListStatus={ALL} onClose={() => setIsFilterVIsible(false)} filterParams={filterParams} />
        <Sorting isVisible={sortingVisibility} bookListStatus={ALL} onClose={() => setSortingVisibility(false)} sortParams={sortParams} />
      </>
    );
  }
  if (bookList.length === 0) {
    return <Text>No results</Text>;
  }
  return undefined;
};

const AllBooks = ({ loadingDataStatus, loadBookList, bookList, filterParams, sortParams, hasNextPage }) => {
  const [isFilterVisible, setIsFilterVIsible] = useState(false);
  const [sortingVisibility, setSortingVisibility] = useState(false);

  useEffect(() => {
    if (loadingDataStatus === IDLE || loadingDataStatus === PENDING) {
      loadBookList({
        page: 0,
        bookListStatus: ALL,
        categoryIds: filterParams.categoryIds,
        sortType: sortParams.type,
        sortDirection: sortParams.direction,
      });
    }
  }, [loadingDataStatus]);

  return renderContent(
    loadingDataStatus,
    loadBookList,
    bookList,
    isFilterVisible,
    setIsFilterVIsible,
    filterParams,
    sortingVisibility,
    setSortingVisibility,
    sortParams,
    hasNextPage,
  );
};

AllBooks.propTypes = {
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

export default AllBooks;
