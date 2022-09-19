import { createSelector } from 'reselect';
import { ALL } from '../../constants/bookListStatuses';

const getBooks = (state) => state.books;
const getSearch = (state) => getBooks(state).search;
const getBookList = (state) => getBooks(state).bookList;
const getBookDetails = (state) => getBooks(state).bookDetails;

export const getSelectedBookId = (state) => getBooks(state).selectedBookId;
export const getSearchQuery = (state) => getSearch(state).query;
export const getSearchResults = (state) => getSearch(state).data;
export const getLoadingSearchResultsStatus = (state) => getSearch(state).loadingDataStatus;
export const getSearchResultsHasNextPage = (state) => getSearch(state).hasNextPage;
export const getBookDetailsData = (state) => getBookDetails(state).data;
export const getLoadingBookDetailsDataStatus = (state) => getBookDetails(state).loadingDataStatus;
export const getAllBookCategoryIds = (state) => getBookList(state).all.filterParams.categoryIds;

export const deriveBookListFilterParams = (bookListStatus) => createSelector([getBookList], (bookList) => bookList[bookListStatus].filterParams);

export const deriveFilterBookCategoryIds = (bookListStatus) =>
  createSelector([deriveBookListFilterParams(bookListStatus)], (filterParams) => filterParams.categoryIds.join(','));

export const deriveSearchQuery = createSelector([getSearchQuery], (query) => query.trim());

export const deriveBookListData = (bookListStatus) => createSelector([getBookList], (bookList) => bookList[bookListStatus].data);

export const deriveLoadingBookListStatus = (bookListStatus) =>
  createSelector([getBookList], (bookList) => bookList[bookListStatus].loadingDataStatus);

export const deriveBookListTotalItems = (bookListStatus) => createSelector([getBookList], (bookList) => bookList[bookListStatus].totalItems);

export const deriveBookListHasNextPage = (bookListStatus) => createSelector([getBookList], (bookList) => bookList[bookListStatus].hasNextPage);

export const getBookListFilterParams = (bookListStatus) => createSelector([getBookList], (bookList) => bookList[bookListStatus].filterParams);

export const getBookListSortParams = (bookListStatus) => createSelector([getBookList], (bookList) => bookList[bookListStatus].sortParams);

export const deriveAllBookList = createSelector([deriveBookListData(ALL)], (bookList) => bookList.map((book) => ({ ...book, bookId: book._id })));

export const deriveSortedBookListData = (bookListStatus) =>
  createSelector([deriveBookListData(bookListStatus)], (bookList) => bookList.sort((prev, next) => next.added - prev.added));
