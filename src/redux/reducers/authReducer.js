import createReducer from '../../utils/createReducer';
import {
  SET_IS_SIGNED_IN,
  SET_SIGN_IN_LOADING,
  SET_IS_GOOGLE_ACCOUNT,
  SET_PROFILE,
  SET_IS_CHECKED,
  SET_SIGN_IN_ERRORS,
  SET_SIGN_IN_EMAIL_ERROR,
  SET_SIGN_IN_PASSWORD_ERROR,
} from '../actions/authActions';

const initialState = {
  isSignedIn: false,
  isGoogleAccount: false,
  profile: {},
  isLoading: false,
  isChecked: false,
  signInErrors: {
    email: '',
    password: '',
  },
};

export default createReducer(initialState, (state, action) => ({
  [SET_IS_SIGNED_IN]: () => ({
    ...state,
    isSignedIn: action.isSignedIn,
  }),
  [SET_SIGN_IN_LOADING]: () => ({
    ...state,
    isLoading: action.isLoading,
  }),
  [SET_SIGN_IN_ERRORS]: () => ({
    ...state,
    signInErrors: action.errors,
  }),
  [SET_SIGN_IN_EMAIL_ERROR]: () => ({
    ...state,
    signInErrors: {
      ...state.signInErrors,
      email: action.error,
    },
  }),
  [SET_SIGN_IN_PASSWORD_ERROR]: () => ({
    ...state,
    signInErrors: {
      ...state.signInErrors,
      password: action.error,
    },
  }),
  [SET_IS_GOOGLE_ACCOUNT]: () => ({
    ...state,
    isGoogleAccount: action.isGoogleAccount,
  }),
  [SET_PROFILE]: () => ({
    ...state,
    profile: action.profile,
  }),
  [SET_IS_CHECKED]: () => ({
    ...state,
    isChecked: action.isChecked,
  }),
}));
