import { connect } from 'react-redux';
import { checkAuth } from '../../redux/actions/authActions';
import { getData } from '../../redux/actions/dataActions';
import Books from './Books';
import { getBooks } from '../../redux/selectors/data';

const mapStateToProps = (state) => ({
  data: getBooks(state),
});

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(getData()),
  checkAuth: (params) => dispatch(checkAuth(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Books);
