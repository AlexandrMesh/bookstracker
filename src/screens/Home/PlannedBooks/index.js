import { connect } from 'react-redux';
import { deriveLoadingBookListStatus, deriveSortedBookListData, deriveBookListHasNextPage } from '../../../redux/selectors/books';
import { loadBookList } from '../../../redux/actions/booksActions';
import { PLANNED } from '../../../constants/bookListStatuses';
import PlannedBooks from './PlannedBooks';

const mapStateToProps = (state) => ({
  bookList: deriveSortedBookListData(PLANNED)(state),
  loadingDataStatus: deriveLoadingBookListStatus(PLANNED)(state),
  hasNextPage: deriveBookListHasNextPage(PLANNED)(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadBookList: (params, shouldLoadMoreResults) => dispatch(loadBookList(params, shouldLoadMoreResults)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlannedBooks);
