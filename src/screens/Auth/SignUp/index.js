import { connect } from 'react-redux';
import { signUp, setSignUpErrors } from '../../../redux/actions/authActions';
import { getIsSignUpLoading, getSignUpErrors } from '../../../redux/selectors/auth';
import SignUp from './SignUp';

const mapStateToProps = (state) => ({
  isLoading: getIsSignUpLoading(state),
  errors: getSignUpErrors(state),
});

const mapDispatchToProps = (dispatch) => ({
  signUp: (params) => dispatch(signUp(params)),
  setSignUpErrors: (errors) => dispatch(setSignUpErrors(errors)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
