import { connect } from 'react-redux';
import { getAppVersion, getSupportEmail } from '../../../redux/selectors/auth';
import About from './About';

const mapStateToProps = (state) => ({
  version: getAppVersion(state),
  supportEmail: getSupportEmail(state),
});

export default connect(mapStateToProps)(About);
