import http from '../http';
import config from '../../config/api';

const AuthService = () => ({
  signIn: (params) => http.post(`${config.API_URL}/signIn`, params),
  checkAuth: (params) => http.post(`${config.API_URL}/checkAuth`, params),
  resetPassword: (params) => http.post(`${config.API_URL}/resetPassword`, params),
  verifyResetPasswordCode: (params) => http.post(`${config.API_URL}/verifyResetPasswordCode`, params),
  setNewPassword: (params) => http.post(`${config.API_URL}/setNewPassword`, params),
});

export default AuthService;
