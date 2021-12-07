import { connect } from 'react-redux';
import {
  getBookList,
  updateUserBook,
  setIsBooksLoading,
  addBookCategoryIdToFilter,
  removeBookCategoryIdFromFilter,
} from '../../redux/actions/booksActions';
import Books from './Books';
import { deriveBooks, getIsAddBookToListLoading, getIsBooksLoading, deriveFilterBookCategoryIds } from '../../redux/selectors/books';

const mapStateToProps = (state) => ({
  bookList: deriveBooks('')(state),
  isAddBookToListLoading: getIsAddBookToListLoading(state),
  isBooksLoading: getIsBooksLoading(state),
  filterCategoryIds: deriveFilterBookCategoryIds(state),
});

const mapDispatchToProps = (dispatch) => ({
  getBookList: (params, shouldUpdate) => dispatch(getBookList(params, shouldUpdate)),
  updateUserBook: (params) => dispatch(updateUserBook(params)),
  setIsBooksLoading: (params) => dispatch(setIsBooksLoading(params)),
  addBookCategoryIdToFilter: (params) => dispatch(addBookCategoryIdToFilter(params)),
  removeBookCategoryIdFromFilter: (params) => dispatch(removeBookCategoryIdFromFilter(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Books);
