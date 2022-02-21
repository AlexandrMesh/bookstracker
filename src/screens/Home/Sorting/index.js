import { connect } from 'react-redux';
import { setSortDirection, setSortType, startLoadingBookList } from '../../../redux/actions/booksActions';
import Sorting from './Sorting';

const mapDispatchToProps = (dispatch) => ({
  setSortDirection: (bookListStatus, sortDirection) => dispatch(setSortDirection(bookListStatus, sortDirection)),
  setSortType: (bookListStatus, sortType) => dispatch(setSortType(bookListStatus, sortType)),
  startLoadingBookList: (bookListStatus) => dispatch(startLoadingBookList(bookListStatus)),
});

export default connect(null, mapDispatchToProps)(Sorting);
