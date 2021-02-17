import { path } from 'ramda';

export const getBooks = path(['books', 'bookList']);
export const getPlannedBooks = path(['books', 'plannedBookList']);
export const getBook = path(['books', 'bookDetails']);
export const getIsBookDetailsLoading = path(['books', 'isBookDetailsLoading']);
export const getPlannedBookIds = path(['books', 'plannedBookIds']);
export const getShouldReloadPlannedBookList = path(['books', 'shouldReloadPlannedBookList']);
export const getIsPlannedBooksLoading = path(['books', 'isPlannedBooksLoading']);
