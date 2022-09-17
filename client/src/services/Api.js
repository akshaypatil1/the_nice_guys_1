const axios = require('axios').default;

const instance = axios.create({
    baseURL: 'http://localhost:4000/api/',
    headers: { 'Content-Type': 'application/json' }
});

instance.interceptors.request.use(function (config) {
    let token = sessionStorage.getItem('token');
    if(token){
    config.headers.Authorization = `Bearer ${token}`}
    return config;
  }, function (error) {
    // Do something with request error
    return Promise.reject(error);
  });

export default instance;