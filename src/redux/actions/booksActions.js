import DataService from '../../http/services/books';
import { getUserId } from '../selectors/auth';
import { getCustomPlannedBooks } from '../selectors/books';
import bookListTypes from '../../constants/bookListTypes';

const PREFIX = 'DATA';

export const BOOKS_LOADED = `${PREFIX}/BOOKS_LOADED`;
export const BOOKS_UPDATED = `${PREFIX}/BOOKS_UPDATED`;
export const BOOK_DETAILS_LOADED = `${PREFIX}/BOOK_DETAILS_LOADED`;
export const SET_BOOKS_LOADING = `${PREFIX}/SET_BOOKS_LOADING`;
export const SET_PLANNED_BOOKS_LOADING = `${PREFIX}/SET_PLANNED_BOOKS_LOADING`;
export const SET_IN_PROGRESS_BOOKS_LOADING = `${PREFIX}/SET_IN_PROGRESS_BOOKS_LOADING`;
export const SET_COMPLETED_BOOKS_LOADING = `${PREFIX}/SET_COMPLETED_BOOKS_LOADING`;
export const SET_BOOK_DETAILS_LOADING = `${PREFIX}/SET_BOOK_DETAILS_LOADING`;
export const CLEAR_BOOK_DETAILS = `${PREFIX}/CLEAR_BOOK_DETAILS`;
export const ADD_TO_IN_PROGRESS_BOOK_IDS = `${PREFIX}/ADD_TO_IN_PROGRESS_BOOK_IDS`;
export const ADD_TO_CUSTOM_PLANNED_BOOKS = `${PREFIX}/ADD_TO_CUSTOM_PLANNED_BOOKS`;
export const ADD_TO_COMPLETED_BOOK_IDS = `${PREFIX}/ADD_TO_COMPLETED_BOOK_IDS`;
export const SET_CUSTOM_PLANNED_BOOKS = `${PREFIX}/SET_CUSTOM_PLANNED_BOOKS`;
export const SET_CUSTOM_IN_PROGRESS_BOOKS = `${PREFIX}/SET_CUSTOM_IN_PROGRESS_BOOKS`;
export const SET_CUSTOM_COMPLETED_BOOKS = `${PREFIX}/SET_CUSTOM_COMPLETED_BOOKS`;
export const PLANNED_BOOKS_LOADED = `${PREFIX}/PLANNED_BOOKS_LOADED`;
export const IN_PROGRESS_BOOKS_LOADED = `${PREFIX}/IN_PROGRESS_BOOKS_LOADED`;
export const COMPLETED_BOOKS_LOADED = `${PREFIX}/COMPLETED_BOOKS_LOADED`;
export const SET_SHOULD_RELOAD_PLANNED_BOOK_LIST = `${PREFIX}/SET_SHOULD_RELOAD_PLANNED_BOOK_LIST`;
export const CLEAR_PLANNED_BOOK_LIST = `${PREFIX}/CLEAR_PLANNED_BOOK_LIST`;
export const SET_ADD_BOOK_TO_LIST_LOADING = `${PREFIX}/SET_ADD_BOOK_TO_LIST_LOADING`;
export const ADD_BOOK_CATEGORY_ID_TO_FILTER = `${PREFIX}/ADD_BOOK_CATEGORY_ID_TO_FILTER`;
export const REMOVE_BOOK_CATEGORY_ID_FROM_FILTER = `${PREFIX}/REMOVE_BOOK_CATEGORY_ID_FROM_FILTER`;
export const SET_SORT_PARAMS = `${PREFIX}/REMOVE_BOOK_CATEGORY_ID_FROM_FILTER`;

export const addBookCategoryIdToFilter = (id) => ({
  type: ADD_BOOK_CATEGORY_ID_TO_FILTER,
  id,
});

export const removeBookCategoryIdFromFilter = (id) => ({
  type: REMOVE_BOOK_CATEGORY_ID_FROM_FILTER,
  id,
});

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

export const booksUpdated = (books) => ({
  type: BOOKS_UPDATED,
  books,
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

export const setCustomPlannedBooks = (customPlannedBooks) => ({
  type: SET_CUSTOM_PLANNED_BOOKS,
  customPlannedBooks,
});

export const setCustomInProgressBooks = (customInProgressBooks) => ({
  type: SET_CUSTOM_IN_PROGRESS_BOOKS,
  customInProgressBooks,
});

export const setCustomCompletedBooks = (customCompletedBooks) => ({
  type: SET_CUSTOM_COMPLETED_BOOKS,
  customCompletedBooks,
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

export const setAddBookToListLoading = (isAddBookToListLoading) => ({
  type: SET_ADD_BOOK_TO_LIST_LOADING,
  isAddBookToListLoading,
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

export const addToCustomPlannedBooks = (book) => ({
  type: ADD_TO_CUSTOM_PLANNED_BOOKS,
  book,
});

export const addToInProgressBookIds = (id) => ({
  type: ADD_TO_IN_PROGRESS_BOOK_IDS,
  id,
});

export const addToCompletedBookIds = (id) => ({
  type: ADD_TO_COMPLETED_BOOK_IDS,
  id,
});

export const getBookList = (params, shouldReplace = false) => async (dispatch) => {
  try {
    const { data } = await DataService().getBookList(params);
    if (data) {
      dispatch(shouldReplace ? booksUpdated(data) : booksLoaded(data));
    }
  } catch (e) {
    console.log(e);
  }
};

const mapPlannedBooks = (plannedBooks, customPlannedBooks) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  plannedBooks.map((plannedBook) => {
    const { createdDate } = customPlannedBooks.find((customBook) => plannedBook._id === customBook.id);
    return { ...plannedBook, createdDate };
  });

export const getPlannedBookList = (params) => async (dispatch, getState) => {
  dispatch(setIsPlannedBooksLoading(true));
  const userId = getUserId(getState());
  const bookListType = bookListTypes.PLANNED;
  const customPlannedBooks = getCustomPlannedBooks(getState());
  try {
    const { data } = await DataService().getBookList({ ...params, userId, bookListType });
    data && dispatch(plannedBooksLoaded(mapPlannedBooks(data, customPlannedBooks)));
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

export const getUserBooks = (params) => async (dispatch) => {
  try {
    const { customPlannedBooks, customInProgressBooks, customCompletedBooks } = await DataService().getUserBooks(params);
    dispatch(setCustomPlannedBooks(customPlannedBooks));
    dispatch(setCustomInProgressBooks(customInProgressBooks));
    dispatch(setCustomCompletedBooks(customCompletedBooks));
  } catch (e) {
    console.log(e);
  }
};

export const updateUserBook = (params) => async (dispatch, getState) => {
  dispatch(setAddBookToListLoading(true));
  const userId = getUserId(getState());
  try {
    const {
      data: { customPlannedBooks, customInProgressBooks, customCompletedBooks },
    } = await DataService().updateUserBook({ ...params, userId });
    if (params.bookType === 'customPlannedBooks') {
      dispatch(clearPlannedBookList);
      dispatch(setShouldReloadPlannedBookList(true));
    }
    dispatch(setCustomPlannedBooks(customPlannedBooks));
    dispatch(setCustomInProgressBooks(customInProgressBooks));
    dispatch(setCustomCompletedBooks(customCompletedBooks));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setAddBookToListLoading(false));
  }
};
