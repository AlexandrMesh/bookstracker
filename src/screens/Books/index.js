import { connect } from 'react-redux';
import { getBookList, addBookToList } from '../../redux/actions/booksActions';
import Books from './Books';
import { getBooks } from '../../redux/selectors/books';

const mapStateToProps = (state) => ({
  bookList: getBooks(state),
});

const mapDispatchToProps = (dispatch) => ({
  getBookList: (params) => dispatch(getBookList(params)),
  addBookToList: (params) => dispatch(addBookToList(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Books);
