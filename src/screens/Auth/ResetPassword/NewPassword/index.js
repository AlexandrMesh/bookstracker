import { connect } from 'react-redux';
import { setResetPasswordNewPassword } from '../../../../redux/actions/authActions';
import { getResetPasswordNewPassword } from '../../../../redux/selectors/auth';
import NewPassword from './NewPassword';

const mapStateToProps = (state) => ({
  newPassword: getResetPasswordNewPassword(state),
});

const mapDispatchToProps = (dispatch) => ({
  setNewPassword: (value) => dispatch(setResetPasswordNewPassword(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(NewPassword);
