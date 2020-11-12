import http from '../http';
import config from '../../config/api';

const AuthService = () => ({
  signIn: (params) => http.post(`${config.API_URL}/signIn`, params),
  checkAuth: (params) => http.post(`${config.API_URL}/checkAuth`, params),
});

export default AuthService;
