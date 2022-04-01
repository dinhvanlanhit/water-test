import axios from 'axios';
import queryString from 'query-string'
const axiosClient = axios.create({
    baseURL:'https://water-test-training.herokuapp.com/',
    headers:{
        'content-type':'application/json',
    },
    paramsSerializer:params=>queryString.stringify(params),
});
axiosClient.interceptors.request.use(function (config) {
    // config.headers = { 
       
    // }
    return config;
},  (error)=>{
    if(error.response!=undefined){
        if (405 === error.response.status) {
            return [];
        }else{
            return [];
        }
    }else{
        return []
    }
});
axiosClient.interceptors.response.use(response=>{
    if(response&&response.data){return response.data;}return response;
}, (error)=>{
    if(error.response!=undefined){
        if (405 === error.response.status) {
            return [];
        }else{
            return [];
        }
    }else{
        return [];
    }
});
export default  axiosClient;