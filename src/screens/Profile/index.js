import { connect } from 'react-redux';
import { getUserEmail } from '../../redux/selectors/auth';
import { signOut } from '../../redux/actions/authActions';
import Profile from './Profile';

const mapStateToProps = (state) => ({
  email: getUserEmail(state),
});

const mapDispatchToProps = (dispatch) => ({
  signOut: () => dispatch(signOut),
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
