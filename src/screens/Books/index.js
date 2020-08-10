import { connect } from 'react-redux';
import { getData } from '../../redux/actions/dataActions';
import Books from './Books';

const mapStateToProps = ({ data }) => ({ data });

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(getData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Books);
