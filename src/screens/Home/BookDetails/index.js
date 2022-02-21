import { connect } from 'react-redux';
import { loadBookDetails, clearBookDetails, updateUserBook } from '../../../redux/actions/booksActions';
import { getBookDetailsData, getLoadingBookDetailsDataStatus } from '../../../redux/selectors/books';
import BookDetails from './BookDetails';

const mapStateToProps = (state) => ({
  bookDetails: getBookDetailsData(state),
  loadingDataStatus: getLoadingBookDetailsDataStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadBookDetails: (params) => dispatch(loadBookDetails(params)),
  clearBookDetails: () => dispatch(clearBookDetails),
  updateUserBook: ({ bookId, bookStatus, bookListStatus }) => dispatch(updateUserBook({ bookId, bookStatus, bookListStatus })),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookDetails);
