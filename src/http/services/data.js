import http from '../http';
import config from '../../config/api';

const DataService = () => ({
  getData: (params) => http.get(`${config.API_URL}/books`, { params }),
});

export default DataService;
