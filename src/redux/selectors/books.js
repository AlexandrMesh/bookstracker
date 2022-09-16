import { createSelector } from 'reselect';

const getBooks = (state) => state.books;
const getSearch = (state) => getBooks(state).search;
const getBookList = (state) => getBooks(state).bookList;
const getBookDetails = (state) => getBooks(state).bookDetails;

export const getBookListStatus = (state) => getBooks(state).bookListStatus;
export const getSelectedBookId = (state) => getBooks(state).selectedBookId;
export const getSearchQuery = (state) => getSearch(state).query;
export const getSearchResults = (state) => getSearch(state).data;
export const getLoadingSearchResultsStatus = (state) => getSearch(state).loadingDataStatus;
export const getSearchResultsHasNextPage = (state) => getSearch(state).hasNextPage;
export const getBookDetailsData = (state) => getBookDetails(state).data;
export const getLoadingBookDetailsDataStatus = (state) => getBookDetails(state).loadingDataStatus;
export const getAllBookList = (state) => getBookList(state).all.data;
export const getLoadingAllBookListStatus = (state) => getBookList(state).all.loadingDataStatus;
export const getPlannedBookList = (state) => getBookList(state).planned.data;
export const getLoadingPlannedBookListStatus = (state) => getBookList(state).planned.loadingDataStatus;
export const getInProgressBookList = (state) => getBookList(state).inProgress.data;
export const getLoadingInProgressBookListStatus = (state) => getBookList(state).inProgress.loadingDataStatus;
export const getCompletedBookList = (state) => getBookList(state).completed.data;
export const getLoadingCompletedBookListStatus = (state) => getBookList(state).completed.loadingDataStatus;
export const getAllBookListTotalItems = (state) => getBookList(state).all.totalItems;
export const getAllBookListHasNextPage = (state) => getBookList(state).all.hasNextPage;
export const getPlannedBookListTotalItems = (state) => getBookList(state).planned.totalItems;
export const getPlannedBookListHasNextPage = (state) => getBookList(state).planned.hasNextPage;
export const getInProgressBookListTotalItems = (state) => getBookList(state).inProgress.totalItems;
export const getInProgressBookListHasNextPage = (state) => getBookList(state).inProgress.hasNextPage;
export const getCompletedBookListTotalItems = (state) => getBookList(state).completed.totalItems;
export const getCompletedBookListHasNextPage = (state) => getBookList(state).completed.hasNextPage;

export const getAllFilterParams = (state) => getBookList(state).all.filterParams;
export const getAllSortParams = (state) => getBookList(state).all.sortParams;

export const getAllBookCategoryIds = (state) => getBookList(state).all.filterParams.categoryIds;

export const deriveFilterBookCategoryIds = createSelector([getAllBookCategoryIds], (categoryIds) => categoryIds.join(','));

export const deriveSearchQuery = createSelector([getSearchQuery], (query) => query.trim());

export const deriveAllBookList = createSelector([getAllBookList], (bookList) => bookList.map((book) => ({ ...book, bookId: book._id })));

export const derivePlannedBookList = createSelector([getPlannedBookList], (bookList) => bookList.sort((prev, next) => next.added - prev.added));

export const deriveInProgressBookList = createSelector([getInProgressBookList], (bookList) => bookList.sort((prev, next) => next.added - prev.added));

export const deriveCompletedBookList = createSelector([getCompletedBookList], (bookList) => bookList.sort((prev, next) => next.added - prev.added));
