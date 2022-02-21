import { connect } from 'react-redux';
import { deriveCompletedBookList, getLoadingCompletedBookListStatus } from '../../../redux/selectors/books';
import { loadBookList } from '../../../redux/actions/booksActions';
import CompletedBooks from './CompletedBooks';

const mapStateToProps = (state) => ({
  bookList: deriveCompletedBookList(state),
  loadingDataStatus: getLoadingCompletedBookListStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadBookList: (params, shouldLoadMoreResults) => dispatch(loadBookList(params, shouldLoadMoreResults)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompletedBooks);
