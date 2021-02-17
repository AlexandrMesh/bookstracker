import { connect } from 'react-redux';
import { getPlannedBookList, addBookToList, setShouldReloadPlannedBookList } from '../../redux/actions/booksActions';
import { getPlannedBooks, getShouldReloadPlannedBookList, getIsPlannedBooksLoading } from '../../redux/selectors/books';
import PlannedBooks from './PlannedBooks';

const mapStateToProps = (state) => ({
  plannedBookList: getPlannedBooks(state),
  shouldReloadPlannedBookList: getShouldReloadPlannedBookList(state),
  isPlannedBooksLoading: getIsPlannedBooksLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  getPlannedBookList: (params) => dispatch(getPlannedBookList(params)),
  addBookToList: (params) => dispatch(addBookToList(params)),
  setShouldReloadPlannedBookList: (params) => dispatch(setShouldReloadPlannedBookList(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlannedBooks);
