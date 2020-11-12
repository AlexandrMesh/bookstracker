import { GoogleSignin } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthService from '../../http/services/auth';

const PREFIX = 'AUTH';

export const SET_IS_SIGNED_IN = `${PREFIX}/SET_IS_SIGNED_IN`;
export const SET_SIGN_IN_LOADING = `${PREFIX}/SET_SIGN_IN_LOADING`;
export const SET_IS_GOOGLE_ACCOUNT = `${PREFIX}/SET_IS_GOOGLE_ACCOUNT`;
export const SET_PROFILE = `${PREFIX}/SET_PROFILE`;
export const SET_IS_CHECKED = `${PREFIX}/SET_IS_CHECKED`;
export const SET_SIGN_IN_ERRORS = `${PREFIX}/SET_SIGN_IN_ERRORS`;
export const SET_SIGN_IN_EMAIL_ERROR = `${PREFIX}/SET_SIGN_IN_EMAIL_ERROR`;
export const SET_SIGN_IN_PASSWORD_ERROR = `${PREFIX}/SET_SIGN_IN_PASSWORD_ERROR`;

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

export const setProfile = (profile) => ({
  type: SET_PROFILE,
  profile,
});

export const checkAuth = ({ token }) => async (dispatch) => {
  try {
    const isGoogleSignedIn = await GoogleSignin.isSignedIn();
    const { data } = await AuthService().checkAuth({ token });
    if (data.profile) {
      dispatch(setProfile(data.profile));
      dispatch(setIsSignedIn(true));
      isGoogleSignedIn && dispatch(setIsGoogleAccount(true));
    }
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setIsChecked(true));
  }
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

export const signOut = () => async (dispatch) => {
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
    dispatch(setProfile({}));
    dispatch(setIsSignedIn(false));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setSignInLoading(false));
  }
  return true;
};
