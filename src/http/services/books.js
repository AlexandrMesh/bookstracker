import http from '../http';
import config from '../../config/api';

const DataService = () => ({
  getBookList: (params) => http.get(`${config.API_URL}/books`, { params }),
  getBookDetails: (params) => http.get(`${config.API_URL}/book`, { params }),
  getUserBooks: (params) => http.get(`${config.API_URL}/getUserBooks`, { params }),
  updateUserBook: (params) => http.post(`${config.API_URL}/updateUserBook`, params),
});

export default DataService;
