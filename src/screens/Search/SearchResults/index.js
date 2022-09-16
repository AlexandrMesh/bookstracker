import { connect } from 'react-redux';
import { getSearchResults, deriveSearchQuery, getLoadingSearchResultsStatus, getSearchResultsHasNextPage } from '../../../redux/selectors/books';
import { loadSearchResults } from '../../../redux/actions/booksActions';
import SearchResults from './SearchResults';

const mapStateToProps = (state) => ({
  searchResult: getSearchResults(state),
  searchQuery: deriveSearchQuery(state),
  loadingDataStatus: getLoadingSearchResultsStatus(state),
  hasNextPage: getSearchResultsHasNextPage(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadSearchResults: (params, shouldLoadMoreResults) => dispatch(loadSearchResults(params, shouldLoadMoreResults)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults);
