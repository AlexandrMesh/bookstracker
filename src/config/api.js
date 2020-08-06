const URL = {
  development: 'http://10.0.75.1:3000',
  production: 'https://site.com:3000',
};

const config = {
  API_URL: __DEV__ ? URL.development : URL.production,
};

export default config;
