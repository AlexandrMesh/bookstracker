import { connect } from 'react-redux';
import { signIn, setSignInEmail, setSignInPassword, signOut } from '../../../redux/actions/authActions';
import { getSignInEmail, getSignInPassword, isLoading } from '../../../redux/selectors/auth';
import Signin from './Signin';

const mapStateToProps = (state) => ({
  email: getSignInEmail(state),
  password: getSignInPassword(state),
  isLoading: isLoading(state),
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (params) => dispatch(signIn(params)),
  signOut: (params) => dispatch(signOut(params)),
  setSignInEmail: (email) => dispatch(setSignInEmail(email)),
  setSignInPassword: (password) => dispatch(setSignInPassword(password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Signin);
