import { connect } from 'react-redux';
import { checkAuth } from '../../redux/actions/authActions';
import { isChecked, isSignedIn } from '../../redux/selectors/auth';
import Main from './Main';

const mapStateToProps = (state) => ({
  isChecked: isChecked(state),
  isSignedIn: isSignedIn(state),
});

const mapDispatchToProps = (dispatch) => ({
  checkAuth: (token) => dispatch(checkAuth(token)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
