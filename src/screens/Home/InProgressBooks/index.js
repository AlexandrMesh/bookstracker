import { connect } from 'react-redux';
import { deriveInProgressBookList, getInProgressBookListHasNextPage, getLoadingInProgressBookListStatus } from '../../../redux/selectors/books';
import { loadBookList } from '../../../redux/actions/booksActions';
import InProgressBooks from './InProgressBooks';

const mapStateToProps = (state) => ({
  bookList: deriveInProgressBookList(state),
  loadingDataStatus: getLoadingInProgressBookListStatus(state),
  hasNextPage: getInProgressBookListHasNextPage(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadBookList: (params, shouldLoadMoreResults) => dispatch(loadBookList(params, shouldLoadMoreResults)),
});

export default connect(mapStateToProps, mapDispatchToProps)(InProgressBooks);
