import createReducer from '../../utils/createReducer';
import {
  BOOKS_LOADED,
  BOOK_DETAILS_LOADED,
  SET_BOOKS_LOADING,
  SET_BOOK_DETAILS_LOADING,
  CLEAR_BOOK_DETAILS,
  ADD_TO_PLANNED_BOOK_IDS,
  PLANNED_BOOKS_LOADED,
  IN_PROGRESS_BOOKS_LOADED,
  COMPLETED_BOOKS_LOADED,
  SET_PLANNED_BOOK_IDS,
  SET_SHOULD_RELOAD_PLANNED_BOOK_LIST,
  CLEAR_PLANNED_BOOK_LIST,
  SET_PLANNED_BOOKS_LOADING,
} from '../actions/booksActions';

const initialState = {
  bookList: [],
  plannedBookList: [],
  inProgressBookList: [],
  completedBookList: [],
  bookDetails: {},
  plannedBookIds: [],
  inProgressBookIds: [],
  completedBookIds: [],
  isBooksLoading: false,
  isPlannedBooksLoading: false,
  isInProgressBooksLoading: false,
  isCompletedBooksLoading: false,
  isBookDetailsLoading: false,
  shouldReloadPlannedBookList: false,
};

export default createReducer(initialState, (state, action) => ({
  [BOOKS_LOADED]: () => ({
    ...state,
    isBooksLoading: false,
    bookList: [...state.bookList, ...action.bookList],
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

  [ADD_TO_PLANNED_BOOK_IDS]: () => ({
    ...state,
    plannedBookIds: [...state.plannedBookIds, action.id],
  }),

  [SET_PLANNED_BOOK_IDS]: () => ({
    ...state,
    plannedBookIds: action.plannedBookIds,
  }),

  [SET_SHOULD_RELOAD_PLANNED_BOOK_LIST]: () => ({
    ...state,
    shouldReloadPlannedBookList: action.shouldReloadPlannedBookList,
  }),

  [CLEAR_PLANNED_BOOK_LIST]: () => ({
    ...state,
    plannedBookList: [],
  }),
}));
