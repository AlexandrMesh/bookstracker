import { connect } from 'react-redux';
import { getData } from '../../redux/actions/dataActions';
import Books from './Books';
import { getBooks } from '../../redux/selectors/data';

const mapStateToProps = (state) => ({
  data: getBooks(state),
});

const mapDispatchToProps = (dispatch) => ({
  getData: (params) => dispatch(getData(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Books);
