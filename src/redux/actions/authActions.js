import { GoogleSignin } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-community/async-storage';
import AuthService from '../../http/services/auth';

const PREFIX = 'AUTH';

export const SET_TOKEN = `${PREFIX}/SET_TOKEN`;
export const SET_SIGN_IN_EMAIL = `${PREFIX}/SET_SIGN_IN_EMAIL`;
export const SET_SIGN_IN_PASSWORD = `${PREFIX}/SET_SIGN_IN_PASSWORD`;
export const SET_SIGN_IN_LOADING = `${PREFIX}/SET_SIGN_IN_LOADING`;
export const SET_IS_GOOGLE_ACCOUNT = `${PREFIX}/SET_IS_GOOGLE_ACCOUNT`;
export const SET_PROFILE = `${PREFIX}/SET_PROFILE`;

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
  dispatch(setSignInLoading(true));
  const isGoogleSignedIn = await GoogleSignin.isSignedIn();
  try {
    const { data } = await AuthService().checkAuth({ token });
    data.profile && dispatch(setProfile(data.profile));
    isGoogleSignedIn && dispatch(setIsGoogleAccount(true));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setSignInLoading(false));
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
      const { data } = await AuthService().signin({ email: googleEmail, googleToken: idToken });
      if (data) {
        dispatch(setToken(data.token));
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
      const { data } = await AuthService().signin({ email, password });
      if (data) {
        dispatch(setToken(data.token));
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
  const isGoogleSignedIn = await GoogleSignin.isSignedIn();
  if (isGoogleSignedIn) {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      dispatch(setIsGoogleAccount(false));
    } catch (error) {
      console.error(error);
    }
  }
  try {
    await AsyncStorage.removeItem('token');
    dispatch(setProfile({}));
    dispatch(setToken(''));
  } catch (error) {
    console.log(error);
  } finally {
    dispatch(setSignInLoading(false));
  }
  return true;
};
