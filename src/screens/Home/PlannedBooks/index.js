import { connect } from 'react-redux';
import { getLoadingPlannedBookListStatus, derivePlannedBookList } from '../../../redux/selectors/books';
import { loadBookList } from '../../../redux/actions/booksActions';
import PlannedBooks from './PlannedBooks';

const mapStateToProps = (state) => ({
  bookList: derivePlannedBookList(state),
  loadingDataStatus: getLoadingPlannedBookListStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadBookList: (params, shouldLoadMoreResults) => dispatch(loadBookList(params, shouldLoadMoreResults)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlannedBooks);
