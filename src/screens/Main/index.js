import { connect } from 'react-redux';
import { checkAuth } from '../../redux/actions/authActions';
import { isChecked, isSignedIn } from '../../redux/selectors/auth';
import Main from './Main';

const mapStateToProps = (state) => ({
  isChecked: isChecked(state),
  isSignedIn: isSignedIn(state),
});

const mapDispatchToProps = (dispatch) => ({
  checkAuth: (params) => dispatch(checkAuth(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
