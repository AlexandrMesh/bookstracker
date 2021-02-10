import createReducer from '../../utils/createReducer';
import { GET_DATA } from '../actions/dataActions';

const initialState = {
  data: [],
};

export default createReducer(initialState, (state, action) => ({
  [GET_DATA]: () => ({
    ...state,
    data: [...state.data, ...action.data],
  }),
}));
