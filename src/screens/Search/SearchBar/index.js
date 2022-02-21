import { connect } from 'react-redux';
import { setSearchQuery } from '../../../redux/actions/booksActions';
import { deriveSearchQuery } from '../../../redux/selectors/books';
import SearchBar from './SearchBar';

const mapStateToProps = (state) => ({
  searchQuery: deriveSearchQuery(state),
});

const mapDispatchToProps = (dispatch) => ({
  setSearchQuery: (query) => dispatch(setSearchQuery(query)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
