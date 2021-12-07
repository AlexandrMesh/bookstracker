import { connect } from 'react-redux';
import { getPlannedBookList, updateUserBook } from '../../redux/actions/booksActions';
import { deriveBooks, getShouldReloadPlannedBookList, getIsPlannedBooksLoading } from '../../redux/selectors/books';
import bookListTypes from '../../constants/bookListTypes';
import PlannedBooks from './PlannedBooks';

const mapStateToProps = (state) => ({
  plannedBookList: deriveBooks(bookListTypes.PLANNED)(state),
  shouldReloadPlannedBookList: getShouldReloadPlannedBookList(state),
  isPlannedBooksLoading: getIsPlannedBooksLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  getPlannedBookList: (params) => dispatch(getPlannedBookList(params)),
  updateUserBook: (params) => dispatch(updateUserBook(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlannedBooks);
