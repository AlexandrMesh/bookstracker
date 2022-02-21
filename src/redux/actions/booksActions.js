import DataService from '../../http/services/books';
import { getUserId } from '../selectors/auth';
import { ALL } from '../../constants/bookListStatuses';

const PREFIX = 'BOOKS';

export const SET_BOOK_LIST_STATUS = `${PREFIX}/SET_BOOK_LIST_STATUS`;
export const CLEAR_BOOK_DETAILS = `${PREFIX}/CLEAR_BOOK_DETAILS`;
export const SET_SEARCH_QUERY = `${PREFIX}/SET_SEARCH_QUERY`;
export const START_LOADING_SEARCH_RESULTS = `${PREFIX}/START_LOADING_SEARCH_RESULTS`;
export const LOADING_SEARCH_RESULTS_FAILED = `${PREFIX}/LOADING_SEARCH_RESULTS_FAILED`;
export const SEARCH_RESULTS_LOADED = `${PREFIX}/SEARCH_RESULTS_LOADED`;

export const BOOK_LIST_LOADED = `${PREFIX}/BOOK_LIST_LOADED`;
export const START_LOADING_BOOK_LIST = `${PREFIX}/START_LOADING_BOOK_LIST`;
export const LOADING_BOOK_LIST_FAILED = `${PREFIX}/LOADING_BOOK_LIST_FAILED`;

export const START_LOADING_USERS_BOOK_LIST = `${PREFIX}/START_LOADING_USERS_BOOK_LIST`;
export const LOADING_USERS_BOOK_LIST_FAILED = `${PREFIX}/LOADING_USERS_BOOK_LIST_FAILED`;

export const START_UPDATING_USERS_BOOK = `${PREFIX}/START_UPDATING_USERS_BOOK`;
export const USER_BOOK_UPDATED = `${PREFIX}/USER_BOOK_UPDATED`;
export const UPDATING_USERS_BOOK_FAILED = `${PREFIX}/UPDATING_USERS_BOOK_FAILED`;

export const REMOVE_BOOK = `${PREFIX}/REMOVE_BOOK`;
export const REMOVE_BOOK_EVERYWHERE = `${PREFIX}/REMOVE_BOOK_EVERYWHERE`;

export const ADD_FILTER_VALUE = `${PREFIX}/ADD_FILTER_VALUE`;
export const REMOVE_FILTER_VALUE = `${PREFIX}/REMOVE_FILTER_VALUE`;

export const SET_SORT_TYPE = `${PREFIX}/SET_SORT_TYPE`;
export const SET_SORT_DIRECTION = `${PREFIX}/SET_SORT_DIRECTION`;

export const START_LOADING_BOOK_DETAILS = `${PREFIX}/START_LOADING_BOOK_DETAILS`;
export const BOOK_DETAILS_LOADED = `${PREFIX}/BOOK_DETAILS_LOADED`;
export const LOADING_BOOK_DETAILS_FAILED = `${PREFIX}/LOADING_BOOK_DETAILS_FAILED`;

export const UPDATE_BOOK = `${PREFIX}/UPDATE_BOOK`;
export const ADD_BOOK = `${PREFIX}/ADD_BOOK`;

export const startUpdatingUsersBook = {
  type: START_UPDATING_USERS_BOOK,
};

export const userBookUpdated = (bookId, bookStatus) => ({
  type: USER_BOOK_UPDATED,
  bookId,
  bookStatus,
});

export const updatingUsersBookFailed = {
  type: UPDATING_USERS_BOOK_FAILED,
};

export const addFilterValue = (bookListStatus, filterParam, value) => ({
  type: ADD_FILTER_VALUE,
  bookListStatus,
  filterParam,
  value,
});

export const removeFilterValue = (bookListStatus, filterParam, value) => ({
  type: REMOVE_FILTER_VALUE,
  bookListStatus,
  filterParam,
  value,
});

export const setSortType = (bookListStatus, sortType) => ({
  type: SET_SORT_TYPE,
  bookListStatus,
  sortType,
});

export const setSortDirection = (bookListStatus, sortDirection) => ({
  type: SET_SORT_DIRECTION,
  bookListStatus,
  sortDirection,
});

export const loadingSearchResultsFailed = {
  type: LOADING_SEARCH_RESULTS_FAILED,
};

export const startLoadingSearchResults = {
  type: START_LOADING_SEARCH_RESULTS,
};

export const setBookListStatus = (bookListStatus) => ({
  type: SET_BOOK_LIST_STATUS,
  bookListStatus,
});

export const removeBook = (id, bookListStatus) => ({
  type: REMOVE_BOOK,
  id,
  bookListStatus,
});

export const updateBook = (bookId, bookListStatus, bookStatus, added) => ({
  type: UPDATE_BOOK,
  bookId,
  bookListStatus,
  bookStatus,
  added,
});

export const addBook = (book, bookListStatus) => ({
  type: ADD_BOOK,
  book,
  bookListStatus,
});

export const removeBookEverywhere = (id) => ({
  type: REMOVE_BOOK_EVERYWHERE,
  id,
});

export const setSearchQuery = (query) => (dispatch) => {
  dispatch({
    type: SET_SEARCH_QUERY,
    query,
  });
  dispatch(startLoadingSearchResults);
};

export const searchResultsLoaded = (data, shouldLoadMoreResults) => ({
  type: SEARCH_RESULTS_LOADED,
  data,
  shouldLoadMoreResults,
});

export const bookListLoaded = (bookListStatus, data, totalItems, hasNexPage, shouldLoadMoreResults) => ({
  type: BOOK_LIST_LOADED,
  bookListStatus,
  data,
  shouldLoadMoreResults,
  totalItems,
  hasNexPage,
});

export const startLoadingBookList = (bookListStatus) => ({
  type: START_LOADING_BOOK_LIST,
  bookListStatus,
});

export const loadingBookListFailed = (bookListStatus) => ({
  type: LOADING_BOOK_LIST_FAILED,
  bookListStatus,
});

export const bookDetailsLoaded = (data) => ({
  type: BOOK_DETAILS_LOADED,
  data,
});

export const startLoadingBookDetails = {
  type: START_LOADING_BOOK_DETAILS,
};

export const loadingBookDetailsFailed = {
  type: LOADING_BOOK_DETAILS_FAILED,
};

export const clearBookDetails = {
  type: CLEAR_BOOK_DETAILS,
};

export const loadSearchResults = (params, shouldLoadMoreResults) => async (dispatch, getState) => {
  const state = getState();
  const userId = getUserId(state);
  try {
    const { data } = (await DataService().getBookList({ ...params, userId })) || [];
    dispatch(searchResultsLoaded(data, shouldLoadMoreResults));
  } catch (e) {
    dispatch(loadingSearchResultsFailed);
  }
};

export const loadBookList = (params, shouldLoadMoreResults) => async (dispatch, getState) => {
  const state = getState();
  const userId = getUserId(state);
  try {
    const { data } = (await DataService().getBookList({ ...params, userId })) || [];
    dispatch(bookListLoaded(params.bookListStatus, data.items, data.pagination.totalItems, data.pagination.hasNextPage, shouldLoadMoreResults));
  } catch (e) {
    dispatch(loadingBookListFailed(params.bookListStatus));
  }
};

export const loadBookDetails = (params) => async (dispatch, getState) => {
  const state = getState();
  dispatch(startLoadingBookDetails);
  const userId = getUserId(state);
  try {
    const bookDetails = (await DataService().getBookDetails({ ...params, userId })) || {};
    dispatch(bookDetailsLoaded(bookDetails.data));
  } catch (e) {
    dispatch(loadingBookDetailsFailed);
  }
};

export const updateUserBook = ({ book, bookStatus, bookListStatus }) => async (dispatch, getState) => {
  dispatch(startUpdatingUsersBook);
  const state = getState();
  const userId = getUserId(state);
  try {
    const { data } = await DataService().updateUserBook({ bookId: book.bookId, bookStatus, userId });
    if (bookListStatus !== ALL) {
      dispatch(removeBook(book.bookId, bookListStatus));
    }
    if (bookListStatus === ALL) {
      dispatch(removeBookEverywhere(book.bookId));
    }
    dispatch(updateBook(book.bookId, ALL, data.bookStatus, data.added));
    dispatch(startLoadingBookList(bookStatus));
  } catch (e) {
    dispatch(updatingUsersBookFailed);
  }
};
