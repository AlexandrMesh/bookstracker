import http from '../http';

const DataService = () => ({
  getData: (params) => http.get('http://10.140.133.245:3000/books', params),
});

export default DataService;
