import http from '../http';
import config from '../../config/api';

const AuthService = () => ({
  signin: (params) => http.post(`${config.API_URL}/signin`, params),
  checkAuth: (params) => http.post(`${config.API_URL}/checkAuth`, params),
});

export default AuthService;
