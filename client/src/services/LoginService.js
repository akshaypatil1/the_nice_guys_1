// import Api from './Api'
const axios = require('axios').default;

export async function login(pid){
    // return Api.post('/public/login',{pid})
    return axios({
        method: 'post',
        url: 'http://localhost:4000/public/login',
        data: {
          pid
        }
      });
}