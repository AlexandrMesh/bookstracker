import createReducer from '../../utils/createReducer';
import { SET_TOKEN, SET_SIGN_IN_EMAIL, SET_SIGN_IN_PASSWORD, SET_SIGN_IN_LOADING, SET_IS_GOOGLE_ACCOUNT, SET_PROFILE } from '../actions/authActions';

const initialState = {
  token: '',
  isGoogleAccount: false,
  profile: {},
  isLoading: false,
  signin: {
    email: {
      value: '',
      errors: [],
    },
    password: {
      value: '',
      errors: [],
    },
  },
  signup: {
    email: {
      value: '',
      errors: [],
    },
    password: {
      value: '',
      errors: [],
    },
  },
};

export default createReducer(initialState, (state, action) => ({
  [SET_TOKEN]: () => ({
    ...state,
    token: action.token,
  }),
  [SET_SIGN_IN_EMAIL]: () => ({
    ...state,
    signin: {
      ...state.signin,
      email: {
        ...state.signin.email,
        value: action.email,
      },
    },
  }),
  [SET_SIGN_IN_PASSWORD]: () => ({
    ...state,
    signin: {
      ...state.signin,
      password: {
        ...state.signin.password,
        value: action.password,
      },
    },
  }),
  [SET_SIGN_IN_LOADING]: () => ({
    ...state,
    isLoading: action.isLoading,
  }),
  [SET_IS_GOOGLE_ACCOUNT]: () => ({
    ...state,
    isGoogleAccount: action.isGoogleAccount,
  }),
  [SET_PROFILE]: () => ({
    ...state,
    profile: action.profile,
  }),
}));
