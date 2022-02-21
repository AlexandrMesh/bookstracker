import { GoogleSignin } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from '../../http/services/auth';
import { getResetPasswordEmail, getResetPasswordCode, getResetPasswordNewPassword } from '../selectors/auth';

const PREFIX = 'AUTH';

export const SET_IS_SIGNED_IN = `${PREFIX}/SET_IS_SIGNED_IN`;
export const SET_SIGN_IN_LOADING = `${PREFIX}/SET_SIGN_IN_LOADING`;
export const SET_IS_GOOGLE_ACCOUNT = `${PREFIX}/SET_IS_GOOGLE_ACCOUNT`;
export const SET_PROFILE = `${PREFIX}/SET_PROFILE`;
export const SET_IS_CHECKED = `${PREFIX}/SET_IS_CHECKED`;
export const SET_SIGN_IN_ERRORS = `${PREFIX}/SET_SIGN_IN_ERRORS`;
export const SET_SIGN_IN_EMAIL_ERROR = `${PREFIX}/SET_SIGN_IN_EMAIL_ERROR`;
export const SET_SIGN_IN_PASSWORD_ERROR = `${PREFIX}/SET_SIGN_IN_PASSWORD_ERROR`;

export const SET_SIGN_UP_LOADING = `${PREFIX}/SET_SIGN_UP_LOADING`;
export const SET_SIGN_UP_ERRORS = `${PREFIX}/SET_SIGN_UP_ERRORS`;

export const SET_RESET_PASSWORD_LOADING = `${PREFIX}/SET_RESET_PASSWORD_LOADING`;
export const SET_RESET_PASSWORD_EMAIL = `${PREFIX}/SET_RESET_PASSWORD_EMAIL`;
export const SET_RESET_PASSWORD_EMAIL_ERROR = `${PREFIX}/SET_RESET_PASSWORD_EMAIL_ERROR`;
export const SET_RESET_PASSWORD_CODE = `${PREFIX}/SET_RESET_PASSWORD_CODE`;
export const SET_RESET_PASSWORD_CODE_ERROR = `${PREFIX}/SET_RESET_PASSWORD_CODE_ERROR`;
export const SET_RESET_PASSWORD_NEW_PASSWORD = `${PREFIX}/SET_RESET_PASSWORD_NEW_PASSWORD`;
export const SET_RESET_PASSWORD_NEW_PASSWORD_ERROR = `${PREFIX}/SET_RESET_PASSWORD_NEW_PASSWORD_ERROR`;
export const CLEAR_PROFILE = `${PREFIX}/CLEAR_PROFILE`;

export const clearProfile = {
  type: CLEAR_PROFILE,
};

export const setResetPasswordLoading = (isLoading) => ({
  type: SET_RESET_PASSWORD_LOADING,
  isLoading,
});

export const setResetPasswordEmail = (email) => ({
  type: SET_RESET_PASSWORD_EMAIL,
  email,
});

export const setResetPasswordEmailError = (error) => ({
  type: SET_RESET_PASSWORD_EMAIL_ERROR,
  error,
});

export const setResetPasswordCode = (code) => ({
  type: SET_RESET_PASSWORD_CODE,
  code,
});

export const setResetPasswordCodeError = (error) => ({
  type: SET_RESET_PASSWORD_CODE_ERROR,
  error,
});

export const setResetPasswordNewPassword = (password) => ({
  type: SET_RESET_PASSWORD_NEW_PASSWORD,
  password,
});

export const setResetPasswordNewPasswordError = (error) => ({
  type: SET_RESET_PASSWORD_NEW_PASSWORD_ERROR,
  error,
});

export const setIsSignedIn = (isSignedIn) => ({
  type: SET_IS_SIGNED_IN,
  isSignedIn,
});

export const setIsChecked = (isChecked) => ({
  type: SET_IS_CHECKED,
  isChecked,
});

export const setSignInErrors = (errors) => ({
  type: SET_SIGN_IN_ERRORS,
  errors,
});

export const setSignUpErrors = (errors) => ({
  type: SET_SIGN_UP_ERRORS,
  errors,
});

export const setSignInEmailError = (error) => ({
  type: SET_SIGN_IN_EMAIL_ERROR,
  error,
});

export const setSignInPasswordError = (error) => ({
  type: SET_SIGN_IN_PASSWORD_ERROR,
  error,
});

export const setIsGoogleAccount = (isGoogleAccount) => ({
  type: SET_IS_GOOGLE_ACCOUNT,
  isGoogleAccount,
});

export const setSignInLoading = (isLoading) => ({
  type: SET_SIGN_IN_LOADING,
  isLoading,
});

export const setSignUpLoading = (isLoading) => ({
  type: SET_SIGN_UP_LOADING,
  isLoading,
});

export const setProfile = (profile) => ({
  type: SET_PROFILE,
  profile,
});

export const checkAuth = (token) => async (dispatch) => {
  try {
    const isGoogleSignedIn = await GoogleSignin.isSignedIn();
    const { data } = await AuthService().checkAuth(token);
    if (data.profile) {
      const { _id, email, registered, updated } = data.profile;
      dispatch(setProfile({ _id, email, registered, updated }));
      dispatch(setIsSignedIn(true));
      return isGoogleSignedIn && dispatch(setIsGoogleAccount(true));
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setIsChecked(true));
  }
  return true;
};

export const signIn = ({ email, password, isGoogleAccount }) => async (dispatch) => {
  dispatch(setSignInLoading(true));
  if (isGoogleAccount) {
    try {
      await GoogleSignin.hasPlayServices();
      const {
        idToken,
        user: { email: googleEmail },
      } = await GoogleSignin.signIn();
      const { data } = await AuthService().signIn({ email: googleEmail, googleToken: idToken });
      if (data) {
        dispatch(setIsSignedIn(true));
        dispatch(setProfile(data.profile));
        dispatch(setIsGoogleAccount(true));
        try {
          await AsyncStorage.setItem('token', data.token);
        } catch (e) {
          console.log(e);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setSignInLoading(false));
    }
  } else {
    try {
      const { data } = await AuthService().signIn({ email, password });
      if (data) {
        dispatch(setIsSignedIn(true));
        dispatch(setProfile(data.profile));
        try {
          await AsyncStorage.setItem('token', data.token);
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setSignInLoading(false));
    }
  }

  return true;
};

export const signUp = ({ email, password }) => async (dispatch) => {
  dispatch(setSignUpLoading(true));
  try {
    const { data } = await AuthService().signUp({ email, password });
    if (data) {
      dispatch(setIsSignedIn(true));
      dispatch(setProfile(data.profile));
      try {
        await AsyncStorage.setItem('token', data.token);
      } catch (e) {
        console.log(e);
      }
    }
  } catch (err) {
    // Set errors into password error
  } finally {
    dispatch(setSignUpLoading(false));
  }
  return true;
};

export const signOut = async (dispatch) => {
  dispatch(setSignInLoading(true));
  try {
    const isGoogleSignedIn = await GoogleSignin.isSignedIn();
    if (isGoogleSignedIn) {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      dispatch(setIsGoogleAccount(false));
    }
  } catch (error) {
    console.error(error);
  }
  try {
    await AsyncStorage.removeItem('token');
    dispatch(setIsSignedIn(false));
    dispatch(clearProfile);
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setSignInLoading(false));
  }
  return true;
};

export const resetPassword = async (dispatch, getState) => {
  dispatch(setResetPasswordLoading(true));
  try {
    const email = getResetPasswordEmail(getState());
    const { data } = await AuthService().resetPassword({ email });
    return data.isSent;
  } catch (err) {
    // Set errors into password error
  } finally {
    dispatch(setResetPasswordLoading(false));
  }
  return true;
};

export const verifyResetPasswordCode = async (dispatch, getState) => {
  dispatch(setResetPasswordLoading(true));
  try {
    const code = getResetPasswordCode(getState());
    const email = getResetPasswordEmail(getState());
    const { data } = await AuthService().verifyResetPasswordCode({ code, email });
    return data.verified;
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setResetPasswordLoading(false));
  }
  return false;
};

export const setNewPassword = async (dispatch, getState) => {
  dispatch(setResetPasswordLoading(true));
  try {
    const newPassword = getResetPasswordNewPassword(getState());
    const email = getResetPasswordEmail(getState());
    const { data } = await AuthService().setNewPassword({ email, newPassword });
    return data.isUpdated;
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setResetPasswordLoading(false));
  }
  return false;
};
