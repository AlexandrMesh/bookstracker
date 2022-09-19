import { connect } from 'react-redux';
import {
  deriveAllBookList,
  deriveLoadingBookListStatus,
  getBookListFilterParams,
  getBookListSortParams,
  deriveBookListHasNextPage,
} from '../../../redux/selectors/books';
import { loadBookList } from '../../../redux/actions/booksActions';
import { ALL } from '../../../constants/bookListStatuses';
import SearchResults from './AllBooks';

const mapStateToProps = (state) => ({
  bookList: deriveAllBookList(state),
  loadingDataStatus: deriveLoadingBookListStatus(ALL)(state),
  filterParams: getBookListFilterParams(ALL)(state),
  sortParams: getBookListSortParams(ALL)(state),
  hasNextPage: deriveBookListHasNextPage(ALL)(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadBookList: (params, shouldLoadMoreResults) => dispatch(loadBookList(params, shouldLoadMoreResults)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
