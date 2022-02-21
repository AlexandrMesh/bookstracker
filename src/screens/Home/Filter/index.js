import { connect } from 'react-redux';
import { addFilterValue, removeFilterValue, startLoadingBookList } from '../../../redux/actions/booksActions';
import Filter from './Filter';

const mapDispatchToProps = (dispatch) => ({
  addFilterValue: (bookListStatus, filterParam, value) => dispatch(addFilterValue(bookListStatus, filterParam, value)),
  removeFilterValue: (bookListStatus, filterParam, value) => dispatch(removeFilterValue(bookListStatus, filterParam, value)),
  startLoadingBookList: (bookListStatus) => dispatch(startLoadingBookList(bookListStatus)),
});

export default connect(null, mapDispatchToProps)(Filter);
