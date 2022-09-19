import { connect } from 'react-redux';
import { deriveSortedBookListData, deriveBookListHasNextPage, deriveLoadingBookListStatus } from '../../../redux/selectors/books';
import { loadBookList } from '../../../redux/actions/booksActions';
import { IN_PROGRESS } from '../../../constants/bookListStatuses';
import InProgressBooks from './InProgressBooks';

const mapStateToProps = (state) => ({
  bookList: deriveSortedBookListData(IN_PROGRESS)(state),
  loadingDataStatus: deriveLoadingBookListStatus(IN_PROGRESS)(state),
  hasNextPage: deriveBookListHasNextPage(IN_PROGRESS)(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadBookList: (params, shouldLoadMoreResults) => dispatch(loadBookList(params, shouldLoadMoreResults)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InProgressBooks);
