import createReducer from '../../utils/createReducer';
import updateIn from '../../utils/updateIn';
import { ALL } from '../../constants/bookListStatuses';
import { IDLE, PENDING, SUCCEEDED, FAILED } from '../../constants/loadingStatuses';
import {
  SET_BOOK_LIST_STATUS,
  BOOK_DETAILS_LOADED,
  CLEAR_BOOK_DETAILS,
  SET_SEARCH_QUERY,
  START_LOADING_SEARCH_RESULTS,
  LOADING_SEARCH_RESULTS_FAILED,
  SEARCH_RESULTS_LOADED,
  BOOK_LIST_LOADED,
  START_LOADING_BOOK_LIST,
  LOADING_BOOK_LIST_FAILED,
  REMOVE_BOOK,
  REMOVE_BOOK_EVERYWHERE,
  ADD_FILTER_VALUE,
  REMOVE_FILTER_VALUE,
  SET_SORT_TYPE,
  SET_SORT_DIRECTION,
  START_LOADING_BOOK_DETAILS,
  LOADING_BOOK_DETAILS_FAILED,
  UPDATE_BOOK,
  ADD_BOOK,
} from '../actions/booksActions';

const initialState = {
  bookListStatus: ALL,
  bookList: {
    all: {
      data: [],
      loadingDataStatus: IDLE,
      filterParams: {
        categoryIds: [],
      },
      sortParams: {
        type: '',
        direction: '',
      },
      totalItems: 0,
      hasNextPage: false,
    },
    planned: {
      data: [],
      loadingDataStatus: IDLE,
      filterParams: {
        categoryIds: [],
      },
      sortParams: {
        type: '',
        direction: '',
      },
      totalItems: 0,
      hasNextPage: false,
    },
    inProgress: {
      data: [],
      loadingDataStatus: IDLE,
      filterParams: {
        categoryIds: [],
      },
      sortParams: {
        type: '',
        direction: '',
      },
      totalItems: 0,
      hasNextPage: false,
    },
    completed: {
      data: [],
      loadingDataStatus: IDLE,
      filterParams: {
        categoryIds: [],
      },
      sortParams: {
        type: '',
        direction: '',
      },
      totalItems: 0,
      hasNextPage: false,
    },
  },
  search: {
    data: [],
    query: '',
    loadingDataStatus: IDLE,
    totalItems: 0,
    hasNextPage: false,
  },
  bookDetails: {
    data: {},
    loadingDataStatus: IDLE,
  },
};

export default createReducer(initialState, (state, action) => ({
  [SET_BOOK_LIST_STATUS]: () => ({
    ...state,
    bookListStatus: action.bookListStatus,
  }),

  [UPDATE_BOOK]: () => ({
    ...state,
    bookList: {
      ...state.bookList,
      [action.bookListStatus]: {
        ...state.bookList[action.bookListStatus],
        data: updateIn(state.bookList[action.bookListStatus].data, (book) => book._id === action.bookId, {
          bookStatus: action.bookStatus,
          added: action.added,
        }),
      },
    },
  }),

  [ADD_BOOK]: () => ({
    ...state,
    bookList: {
      ...state.bookList,
      [action.bookListStatus]: {
        ...state.bookList[action.bookListStatus],
        data: [...state.bookList[action.bookListStatus].data, action.book],
      },
    },
  }),

  [START_LOADING_BOOK_LIST]: () => ({
    ...state,
    bookList: {
      ...state.bookList,
      [action.bookListStatus]: {
        ...state.bookList[action.bookListStatus],
        loadingDataStatus: PENDING,
      },
    },
  }),

  [BOOK_LIST_LOADED]: () => ({
    ...state,
    bookList: {
      ...state.bookList,
      [action.bookListStatus]: {
        ...state.bookList[action.bookListStatus],
        data: action.shouldLoadMoreResults ? [...state.bookList[action.bookListStatus].data, ...action.data] : action.data,
        totalItems: action.totalItems,
        hasNextPage: action.hasNextPage,
        loadingDataStatus: SUCCEEDED,
      },
    },
  }),

  [LOADING_BOOK_LIST_FAILED]: () => ({
    ...state,
    bookList: {
      ...state.bookList,
      [action.bookListStatus]: {
        ...state.bookList[action.bookListStatus],
        loadingDataStatus: FAILED,
      },
    },
  }),

  [ADD_FILTER_VALUE]: () => ({
    ...state,
    bookList: {
      ...state.bookList,
      [action.bookListStatus]: {
        ...state.bookList[action.bookListStatus],
        filterParams: {
          ...state.bookList[action.bookListStatus].filterParams,
          [action.filterParam]: [...state.bookList[action.bookListStatus].filterParams[action.filterParam], action.value],
        },
      },
    },
  }),

  [REMOVE_FILTER_VALUE]: () => ({
    ...state,
    bookList: {
      ...state.bookList,
      [action.bookListStatus]: {
        ...state.bookList[action.bookListStatus],
        filterParams: {
          ...state.bookList[action.bookListStatus].filterParams,
          [action.filterParam]: state.bookList[action.bookListStatus].filterParams[action.filterParam].filter((param) => param !== action.value),
        },
      },
    },
  }),

  [SET_SORT_TYPE]: () => ({
    ...state,
    bookList: {
      ...state.bookList,
      [action.bookListStatus]: {
        ...state.bookList[action.bookListStatus],
        sortParams: {
          ...state.bookList[action.bookListStatus].sortParams,
          type: action.sortType,
        },
      },
    },
  }),

  [SET_SORT_DIRECTION]: () => ({
    ...state,
    bookList: {
      ...state.bookList,
      [action.bookListStatus]: {
        ...state.bookList[action.bookListStatus],
        sortParams: {
          ...state.bookList[action.bookListStatus].sortParams,
          direction: action.sortDirection,
        },
      },
    },
  }),

  [REMOVE_BOOK]: () => ({
    ...state,
    bookList: {
      ...state.bookList,
      [action.bookListStatus]: {
        ...state.bookList[action.bookListStatus],
        data: state.bookList[action.bookListStatus].data.filter((book) => book.bookId !== action.id),
      },
    },
  }),

  [REMOVE_BOOK_EVERYWHERE]: () => ({
    ...state,
    bookList: {
      ...state.bookList,
      planned: {
        ...state.bookList.planned,
        data: state.bookList.planned.data.filter((book) => book.bookId !== action.id),
      },
      inProgress: {
        ...state.bookList.inProgress,
        data: state.bookList.inProgress.data.filter((book) => book.bookId !== action.id),
      },
      completed: {
        ...state.bookList.completed,
        data: state.bookList.completed.data.filter((book) => book.bookId !== action.id),
      },
    },
  }),

  [SEARCH_RESULTS_LOADED]: () => ({
    ...state,
    search: {
      ...state.search,
      data: action.shouldLoadMoreResults ? [...state.search.data, ...action.data] : action.data,
      totalItems: action.totalItems,
      hasNextPage: action.hasNextPage,
      loadingDataStatus: SUCCEEDED,
    },
  }),

  [START_LOADING_SEARCH_RESULTS]: () => ({
    ...state,
    search: {
      ...state.search,
      loadingDataStatus: PENDING,
    },
  }),

  [LOADING_SEARCH_RESULTS_FAILED]: () => ({
    ...state,
    search: {
      ...state.search,
      loadingDataStatus: FAILED,
    },
  }),

  [SET_SEARCH_QUERY]: () => ({
    ...state,
    search: {
      ...state.search,
      query: action.query,
    },
  }),

  [START_LOADING_BOOK_DETAILS]: () => ({
    ...state,
    bookDetails: {
      ...state.bookDetails,
      loadingDataStatus: PENDING,
    },
  }),

  [BOOK_DETAILS_LOADED]: () => ({
    ...state,
    bookDetails: {
      ...state.bookDetails,
      loadingDataStatus: SUCCEEDED,
      data: action.data,
    },
  }),

  [LOADING_BOOK_DETAILS_FAILED]: () => ({
    ...state,
    bookDetails: {
      ...state.bookDetails,
      loadingDataStatus: FAILED,
    },
  }),

  [CLEAR_BOOK_DETAILS]: () => ({
    ...state,
    bookDetails: initialState.bookDetails,
  }),
}));
