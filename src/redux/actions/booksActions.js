import DataService from '../../http/services/books';
import { getUserId } from '../selectors/auth';
import bookListTypes from '../../constants/bookListTypes';

const PREFIX = 'DATA';

export const BOOKS_LOADED = `${PREFIX}/BOOKS_LOADED`;
export const BOOK_DETAILS_LOADED = `${PREFIX}/BOOK_DETAILS_LOADED`;
export const SET_BOOKS_LOADING = `${PREFIX}/SET_BOOKS_LOADING`;
export const SET_PLANNED_BOOKS_LOADING = `${PREFIX}/SET_PLANNED_BOOKS_LOADING`;
export const SET_IN_PROGRESS_BOOKS_LOADING = `${PREFIX}/SET_IN_PROGRESS_BOOKS_LOADING`;
export const SET_COMPLETED_BOOKS_LOADING = `${PREFIX}/SET_COMPLETED_BOOKS_LOADING`;
export const SET_BOOK_DETAILS_LOADING = `${PREFIX}/SET_BOOK_DETAILS_LOADING`;
export const CLEAR_BOOK_DETAILS = `${PREFIX}/CLEAR_BOOK_DETAILS`;
export const ADD_TO_PLANNED_BOOK_IDS = `${PREFIX}/ADD_TO_PLANNED_BOOK_IDS`;
export const ADD_TO_IN_PROGRESS_BOOK_IDS = `${PREFIX}/ADD_TO_IN_PROGRESS_BOOK_IDS`;
export const ADD_TO_COMPLETED_BOOK_IDS = `${PREFIX}/ADD_TO_COMPLETED_BOOK_IDS`;
export const SET_PLANNED_BOOK_IDS = `${PREFIX}/SET_PLANNED_BOOK_IDS`;
export const PLANNED_BOOKS_LOADED = `${PREFIX}/PLANNED_BOOKS_LOADED`;
export const IN_PROGRESS_BOOKS_LOADED = `${PREFIX}/IN_PROGRESS_BOOKS_LOADED`;
export const COMPLETED_BOOKS_LOADED = `${PREFIX}/COMPLETED_BOOKS_LOADED`;
export const SET_SHOULD_RELOAD_PLANNED_BOOK_LIST = `${PREFIX}/SET_SHOULD_RELOAD_PLANNED_BOOK_LIST`;
export const CLEAR_PLANNED_BOOK_LIST = `${PREFIX}/CLEAR_PLANNED_BOOK_LIST`;

export const clearPlannedBookList = {
  type: CLEAR_PLANNED_BOOK_LIST,
};

export const setShouldReloadPlannedBookList = (shouldReloadPlannedBookList) => ({
  type: SET_SHOULD_RELOAD_PLANNED_BOOK_LIST,
  shouldReloadPlannedBookList,
});

export const booksLoaded = (bookList) => ({
  type: BOOKS_LOADED,
  bookList,
});

export const plannedBooksLoaded = (plannedBookList) => ({
  type: PLANNED_BOOKS_LOADED,
  plannedBookList,
});

export const inProgressBooksLoaded = (inProgressBookList) => ({
  type: IN_PROGRESS_BOOKS_LOADED,
  inProgressBookList,
});

export const completedBooksLoaded = (completedBookList) => ({
  type: COMPLETED_BOOKS_LOADED,
  completedBookList,
});

export const setPlannedBookIds = (plannedBookIds) => ({
  type: SET_PLANNED_BOOK_IDS,
  plannedBookIds,
});

export const bookDetailsLoaded = (bookDetails) => ({
  type: BOOK_DETAILS_LOADED,
  bookDetails,
});

export const clearBookDetails = {
  type: CLEAR_BOOK_DETAILS,
};

export const setIsBooksLoading = (isBooksLoading) => ({
  type: SET_BOOKS_LOADING,
  isBooksLoading,
});

export const setIsPlannedBooksLoading = (isPlannedBooksLoading) => ({
  type: SET_PLANNED_BOOKS_LOADING,
  isPlannedBooksLoading,
});

export const setIsInProgressBooksLoading = (isInProgressBooksLoading) => ({
  type: SET_IN_PROGRESS_BOOKS_LOADING,
  isInProgressBooksLoading,
});

export const setIsCompletedBooksLoading = (isCompletedBooksLoading) => ({
  type: SET_COMPLETED_BOOKS_LOADING,
  isCompletedBooksLoading,
});

export const setIsBookDetailsLoading = (isBookDetailsLoading) => ({
  type: SET_BOOK_DETAILS_LOADING,
  isBookDetailsLoading,
});

export const addToPlannedBookIds = (id) => ({
  type: ADD_TO_PLANNED_BOOK_IDS,
  id,
});

export const addToInProgressBookIds = (id) => ({
  type: ADD_TO_IN_PROGRESS_BOOK_IDS,
  id,
});

export const addToCompletedBookIds = (id) => ({
  type: ADD_TO_COMPLETED_BOOK_IDS,
  id,
});

export const getBookList = (params) => async (dispatch) => {
  dispatch(setIsBooksLoading(true));
  try {
    const bookList = await DataService().getBookList(params);
    bookList.data && dispatch(booksLoaded(bookList.data));
  } catch (e) {
    console.log(e);
  }
};

export const getPlannedBookList = (params) => async (dispatch, getState) => {
  dispatch(setIsPlannedBooksLoading(true));
  const userId = getUserId(getState());
  const bookListType = bookListTypes.PLANNED;
  try {
    const bookList = await DataService().getBookList({ ...params, userId, bookListType });
    bookList.data && dispatch(plannedBooksLoaded(bookList.data));
  } catch (e) {
    console.log(e);
  }
};

export const getInProgressBookList = (params) => async (dispatch) => {
  dispatch(setIsBooksLoading(true));
  try {
    const bookList = await DataService().getBookList(params);
    bookList.data && dispatch(booksLoaded(bookList.data));
  } catch (e) {
    console.log(e);
  }
};

export const getCompletedBookList = (params) => async (dispatch) => {
  dispatch(setIsBooksLoading(true));
  try {
    const bookList = await DataService().getBookList(params);
    bookList.data && dispatch(booksLoaded(bookList.data));
  } catch (e) {
    console.log(e);
  }
};

export const getBookDetails = (params) => async (dispatch) => {
  dispatch(setIsBookDetailsLoading(true));
  try {
    const bookDetails = await DataService().getBookDetails(params);
    bookDetails.data && dispatch(bookDetailsLoaded(bookDetails.data));
  } catch (e) {
    console.log(e);
  }
};

export const addBookToList = (params) => async (dispatch, getState) => {
  const userId = getUserId(getState());
  try {
    const book = await DataService().addBookToList({ ...params, userId });
    dispatch(clearPlannedBookList);
    dispatch(setShouldReloadPlannedBookList(true));
    console.log(book, 'book');
  } catch (e) {
    console.log(e);
  }
};
