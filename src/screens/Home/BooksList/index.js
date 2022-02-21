import { connect } from 'react-redux';
import { updateUserBook, removeBook } from '../../../redux/actions/booksActions';
import BooksList from './BooksList';

const mapDispatchToProps = (dispatch) => ({
  updateUserBook: ({ book, bookStatus, bookListStatus }) => dispatch(updateUserBook({ book, bookStatus, bookListStatus })),
  removeBook: (id, bookListStatus) => dispatch(removeBook(id, bookListStatus)),
});

export default connect(null, mapDispatchToProps)(BooksList);
