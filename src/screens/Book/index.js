import { connect } from 'react-redux';
import { getBookDetails, clearBookDetails } from '../../redux/actions/booksActions';
import { getBook, getIsBookDetailsLoading } from '../../redux/selectors/books';
import Book from './Book';

const mapStateToProps = (state) => ({
  bookDetails: getBook(state),
  isBookDetailsLoading: getIsBookDetailsLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  getBookDetails: (params) => dispatch(getBookDetails(params)),
  clearBookDetails: () => dispatch(clearBookDetails),
});

export default connect(mapStateToProps, mapDispatchToProps)(Book);
