import { connect } from 'react-redux';
import { signIn, signOut, setSignInErrors } from '../../../redux/actions/authActions';
import { isLoading, getErrors } from '../../../redux/selectors/auth';
import SignIn from './SignIn';

const mapStateToProps = (state) => ({
  isLoading: isLoading(state),
  errors: getErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (params) => dispatch(signIn(params)),
  signOut: (params) => dispatch(signOut(params)),
  setSignInErrors: (errors) => dispatch(setSignInErrors(errors)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
