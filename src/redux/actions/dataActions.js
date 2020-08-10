import DataService from '../../http/services/data';

const PREFIX = 'DATA';

export const GET_DATA = `${PREFIX}/GET_DATA`;

export const getDataSuccess = (data) => ({
  type: GET_DATA,
  data,
});

export const getData = (params) => (dispatch) => {
  DataService()
    .getData(params)
    .then((data) => {
      if (data.data) {
        dispatch(getDataSuccess(data.data));
      }
    });
};
