import http from '../http';
import config from '../../config/api';

const DataService = () => ({
  getBookList: (params) => http.get(`${config.API_URL}/books`, { params }),
  getBookDetails: (params) => http.get(`${config.API_URL}/book`, { params }),
  addBookToList: (params) => http.post(`${config.API_URL}/addBookToList`, params),
});

export default DataService;
