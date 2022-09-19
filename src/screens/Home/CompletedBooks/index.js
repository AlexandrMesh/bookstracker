import { connect } from 'react-redux';
import { deriveSortedBookListData, deriveBookListHasNextPage, deriveLoadingBookListStatus } from '../../../redux/selectors/books';
import { loadBookList } from '../../../redux/actions/booksActions';
import { COMPLETED } from '../../../constants/bookListStatuses';
import CompletedBooks from './CompletedBooks';

const mapStateToProps = (state) => ({
  bookList: deriveSortedBookListData(COMPLETED)(state),
  loadingDataStatus: deriveLoadingBookListStatus(COMPLETED)(state),
  hasNextPage: deriveBookListHasNextPage(COMPLETED)(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadBookList: (params, shouldLoadMoreResults) => dispatch(loadBookList(params, shouldLoadMoreResults)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompletedBooks);
