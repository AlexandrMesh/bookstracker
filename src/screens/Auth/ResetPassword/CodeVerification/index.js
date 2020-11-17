import { connect } from 'react-redux';
import { setResetPasswordCode } from '../../../../redux/actions/authActions';
import { getResetPasswordCode } from '../../../../redux/selectors/auth';
import CodeVerification from './CodeVerification';

const mapStateToProps = (state) => ({
  code: getResetPasswordCode(state),
});

const mapDispatchToProps = (dispatch) => ({
  setCode: (value) => dispatch(setResetPasswordCode(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CodeVerification);
