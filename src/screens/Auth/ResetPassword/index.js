import { connect } from 'react-redux';
import { setResetPasswordEmail, resetPassword } from '../../../redux/actions/authActions';
import { getResetPasswordEmail } from '../../../redux/selectors/auth';
import ResetPassword from './ResetPassword';

const mapStateToProps = (state) => ({
  email: getResetPasswordEmail(state),
});

const mapDispatchToProps = (dispatch) => ({
  setEmail: (value) => dispatch(setResetPasswordEmail(value)),
  resetPassword: () => dispatch(resetPassword),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);
