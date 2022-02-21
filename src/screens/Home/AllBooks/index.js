import { connect } from 'react-redux';
import { deriveAllBookList, getLoadingAllBookListStatus, getAllFilterParams, getAllSortParams } from '../../../redux/selectors/books';
import { loadBookList } from '../../../redux/actions/booksActions';
import SearchResults from './AllBooks';

const mapStateToProps = (state) => ({
  bookList: deriveAllBookList(state),
  loadingDataStatus: getLoadingAllBookListStatus(state),
  filterParams: getAllFilterParams(state),
  sortParams: getAllSortParams(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadBookList: (params, shouldLoadMoreResults) => dispatch(loadBookList(params, shouldLoadMoreResults)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
