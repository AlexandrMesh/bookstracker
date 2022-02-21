import { connect } from 'react-redux';
import { signIn, signOut, setSignInErrors } from '../../../redux/actions/authActions';
import { getIsLoading, getSignInErrors } from '../../../redux/selectors/auth';
import SignIn from './SignIn';

const mapStateToProps = (state) => ({
  isLoading: getIsLoading(state),
  errors: getSignInErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (params) => dispatch(signIn(params)),
  signOut: () => dispatch(signOut),
  setSignInErrors: (errors) => dispatch(setSignInErrors(errors)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
