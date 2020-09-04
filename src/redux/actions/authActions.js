import AuthService from '../../http/services/auth';

const PREFIX = 'AUTH';

export const SET_TOKEN = `${PREFIX}/SET_TOKEN`;
export const SET_SIGN_IN_EMAIL = `${PREFIX}/SET_SIGN_IN_EMAIL`;
export const SET_SIGN_IN_PASSWORD = `${PREFIX}/SET_SIGN_IN_PASSWORD`;
export const SET_SIGN_IN_LOADING = `${PREFIX}/SET_SIGN_IN_LOADING`;

export const setToken = (token) => ({
  type: SET_TOKEN,
  token,
});

export const setSignInEmail = (email) => ({
  type: SET_SIGN_IN_EMAIL,
  email,
});

export const setSignInPassword = (password) => ({
  type: SET_SIGN_IN_PASSWORD,
  password,
});

export const setSignInLoading = (isLoading) => ({
  type: SET_SIGN_IN_LOADING,
  isLoading,
});

export const signIn = (params) => async (dispatch) => {
  dispatch(setSignInLoading(true));
  try {
    const data = await AuthService().signin(params);
    data && dispatch(setToken(data));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setSignInLoading(false));
  }
};
