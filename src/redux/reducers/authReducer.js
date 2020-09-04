import createReducer from '../../utils/createReducer';
import { SET_TOKEN, SET_SIGN_IN_EMAIL, SET_SIGN_IN_PASSWORD, SET_SIGN_IN_LOADING } from '../actions/authActions';

const initialState = {
  token: '',
  signin: {
    email: {
      value: '',
      errors: [],
    },
    password: {
      value: '',
      errors: [],
    },
    isLoading: false,
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
    isLoading: false,
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
    signin: {
      ...state.signin,
      isLoading: action.isLoading,
    },
  }),
}));
