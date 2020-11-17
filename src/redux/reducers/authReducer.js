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
  SET_RESET_PASSWORD_LOADING,
  SET_RESET_PASSWORD_EMAIL,
  SET_RESET_PASSWORD_EMAIL_ERROR,
  SET_RESET_PASSWORD_CODE,
  SET_RESET_PASSWORD_CODE_ERROR,
  SET_RESET_PASSWORD_NEW_PASSWORD,
  SET_RESET_PASSWORD_NEW_PASSWORD_ERROR,
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
  resetPassword: {
    isLoading: false,
    email: {
      value: '',
      error: '',
    },
    code: {
      value: '',
      error: '',
    },
    newPassword: {
      value: '',
      error: '',
    },
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
  [SET_RESET_PASSWORD_LOADING]: () => ({
    ...state,
    resetPassword: {
      ...state.resetPassword,
      isLoading: action.isLoading,
    },
  }),
  [SET_RESET_PASSWORD_EMAIL]: () => ({
    ...state,
    resetPassword: {
      ...state.resetPassword,
      email: {
        ...state.resetPassword.email,
        value: action.email,
      },
    },
  }),
  [SET_RESET_PASSWORD_EMAIL_ERROR]: () => ({
    ...state,
    resetPassword: {
      ...state.resetPassword,
      email: {
        ...state.resetPassword.email,
        error: action.error,
      },
    },
  }),
  [SET_RESET_PASSWORD_CODE]: () => ({
    ...state,
    resetPassword: {
      ...state.resetPassword,
      code: {
        ...state.resetPassword.code,
        value: action.code,
      },
    },
  }),
  [SET_RESET_PASSWORD_CODE_ERROR]: () => ({
    ...state,
    resetPassword: {
      ...state.resetPassword,
      code: {
        ...state.resetPassword.code,
        error: action.error,
      },
    },
  }),
  [SET_RESET_PASSWORD_NEW_PASSWORD]: () => ({
    ...state,
    resetPassword: {
      ...state.resetPassword,
      newPassword: {
        ...state.resetPassword.password,
        value: action.password,
      },
    },
  }),
  [SET_RESET_PASSWORD_NEW_PASSWORD_ERROR]: () => ({
    ...state,
    resetPassword: {
      ...state.resetPassword,
      newPassword: {
        ...state.resetPassword.password,
        error: action.error,
      },
    },
  }),
}));
