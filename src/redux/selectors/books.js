import { path } from 'ramda';
import { createSelector } from 'reselect';
import bookListTypes from '../../constants/bookListTypes';
// TODO: Chaining operator
export const getBooks = path(['books', 'bookList']);
export const getPlannedBooks = path(['books', 'plannedBookList']);
export const getBook = path(['books', 'bookDetails']);
export const getIsBookDetailsLoading = path(['books', 'isBookDetailsLoading']);
export const getIsAddBookToListLoading = path(['books', 'isAddBookToListLoading']);
export const getCustomPlannedBooks = path(['books', 'customPlannedBooks']);
export const getCustomInProgressBooks = path(['books', 'customInProgressBooks']);
export const getCustomCompletedBooks = path(['books', 'customCompletedBooks']);
export const getShouldReloadPlannedBookList = path(['books', 'shouldReloadPlannedBookList']);
export const getIsPlannedBooksLoading = path(['books', 'isPlannedBooksLoading']);
export const getIsBooksLoading = path(['books', 'isBooksLoading']);
export const getFilterBookCategoryIds = path(['books', 'filter', 'categoryIds']);

export const deriveFilterBookCategoryIds = createSelector([getFilterBookCategoryIds], (categoryIds) => categoryIds.join(','));

export const deriveBooks = createSelector(
  [getBooks, getCustomPlannedBooks, getCustomInProgressBooks, getCustomCompletedBooks],
  // eslint-disable-next-line arrow-body-style
  (books, customPlannedBooks, customInProgressBooks, customCompletedBooks) => {
    return books.map((book) => {
      const isPlanned = customPlannedBooks.some((customPlannedBook) => book._id === customPlannedBook.id) && bookListTypes.PLANNED;
      const isInProgress = customInProgressBooks.some((customInProgressBook) => book._id === customInProgressBook.id) && bookListTypes.IN_PROGRESS;
      const isCompleted = customCompletedBooks.some((customCompleted) => book._id === customCompleted.id) && bookListTypes.COMPLETED;
      const type = isPlanned || isInProgress || isCompleted;
      return type ? { ...book, type } : { ...book };
    });
  },
);
