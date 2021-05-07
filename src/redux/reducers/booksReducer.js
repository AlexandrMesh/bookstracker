import createReducer from '../../utils/createReducer';
import {
  BOOKS_LOADED,
  BOOK_DETAILS_LOADED,
  SET_BOOKS_LOADING,
  SET_BOOK_DETAILS_LOADING,
  CLEAR_BOOK_DETAILS,
  ADD_TO_CUSTOM_PLANNED_BOOKS,
  PLANNED_BOOKS_LOADED,
  IN_PROGRESS_BOOKS_LOADED,
  COMPLETED_BOOKS_LOADED,
  SET_CUSTOM_PLANNED_BOOKS,
  SET_CUSTOM_IN_PROGRESS_BOOKS,
  SET_CUSTOM_COMPLETED_BOOKS,
  SET_SHOULD_RELOAD_PLANNED_BOOK_LIST,
  CLEAR_PLANNED_BOOK_LIST,
  SET_PLANNED_BOOKS_LOADING,
  SET_ADD_BOOK_TO_LIST_LOADING,
  BOOKS_UPDATED,
  ADD_BOOK_CATEGORY_ID_TO_FILTER,
  REMOVE_BOOK_CATEGORY_ID_FROM_FILTER,
} from '../actions/booksActions';

const initialState = {
  bookList: [],
  plannedBookList: [],
  inProgressBookList: [],
  completedBookList: [],
  bookDetails: {},
  customPlannedBooks: [],
  customInProgressBooks: [],
  customCompletedBooks: [],
  filter: {
    categoryIds: [],
    sortParams: {},
  },
  isBooksLoading: false,
  isPlannedBooksLoading: false,
  isInProgressBooksLoading: false,
  isCompletedBooksLoading: false,
  isBookDetailsLoading: false,
  isAddBookToListLoading: false,
  shouldReloadPlannedBookList: false,
};

export default createReducer(initialState, (state, action) => ({
  [BOOKS_LOADED]: () => ({
    ...state,
    isBooksLoading: false,
    bookList: [...state.bookList, ...action.bookList],
  }),

  [BOOKS_UPDATED]: () => ({
    ...state,
    bookList: action.books,
  }),

  [SET_PLANNED_BOOKS_LOADING]: () => ({
    ...state,
    isPlannedBooksLoading: action.isPlannedBooksLoading,
  }),

  [PLANNED_BOOKS_LOADED]: () => ({
    ...state,
    isPlannedBooksLoading: false,
    plannedBookList: [...state.plannedBookList, ...action.plannedBookList],
  }),

  [IN_PROGRESS_BOOKS_LOADED]: () => ({
    ...state,
    isInProgressBooksLoading: false,
    inProgressBookList: [...state.inProgressBookList, ...action.inProgressBookList],
  }),

  [COMPLETED_BOOKS_LOADED]: () => ({
    ...state,
    isCompletedBooksLoading: false,
    completedBookList: [...state.completedBookList, ...action.completedBookList],
  }),

  [BOOK_DETAILS_LOADED]: () => ({
    ...state,
    isBookDetailsLoading: false,
    bookDetails: action.bookDetails,
  }),

  [SET_BOOKS_LOADING]: () => ({
    ...state,
    isBooksLoading: action.isBooksLoading,
  }),

  [SET_BOOK_DETAILS_LOADING]: () => ({
    ...state,
    isBookDetailsLoading: action.isBookDetailsLoading,
  }),

  [CLEAR_BOOK_DETAILS]: () => ({
    ...state,
    bookDetails: initialState.bookDetails,
  }),

  [ADD_TO_CUSTOM_PLANNED_BOOKS]: () => ({
    ...state,
    customPlannedBooks: [...state.customPlannedBooks, action.book],
  }),

  [SET_CUSTOM_PLANNED_BOOKS]: () => ({
    ...state,
    customPlannedBooks: action.customPlannedBooks,
  }),

  [SET_CUSTOM_IN_PROGRESS_BOOKS]: () => ({
    ...state,
    customInProgressBooks: action.customInProgressBooks,
  }),

  [SET_CUSTOM_COMPLETED_BOOKS]: () => ({
    ...state,
    customCompletedBooks: action.customCompletedBooks,
  }),

  [SET_SHOULD_RELOAD_PLANNED_BOOK_LIST]: () => ({
    ...state,
    shouldReloadPlannedBookList: action.shouldReloadPlannedBookList,
  }),

  [CLEAR_PLANNED_BOOK_LIST]: () => ({
    ...state,
    plannedBookList: [],
  }),

  [SET_ADD_BOOK_TO_LIST_LOADING]: () => ({
    ...state,
    isAddBookToListLoading: action.isAddBookToListLoading,
  }),

  [ADD_BOOK_CATEGORY_ID_TO_FILTER]: () => ({
    ...state,
    filter: {
      ...state.filter,
      categoryIds: [...state.filter.categoryIds, action.id],
    },
  }),

  [REMOVE_BOOK_CATEGORY_ID_FROM_FILTER]: () => ({
    ...state,
    filter: {
      ...state.filter,
      categoryIds: state.filter.categoryIds.filter((bookId) => action.id !== bookId),
    },
  }),
}));
