import axios from 'axios';
// import router from '../router';
import url from './config';

const config = {
  baseUrl: `${url.localUrl}/`,
};

axios.defaults.baseURL = config.baseUrl;

// axios.interceptors.request.use((req) => {
//   const token = localStorage.getItem('Authorization');
//   if (token) {
//     req.headers.Authorization = `Bearer ${token}`;
//   }
//   return req;
// });

axios.interceptors.response.use(
  res => res.data,
  error =>
    // if (error.response.status === 401) {
    //   router.push('/login');
    // } else if (error.response.status === 404) {
    //   router.push('/404');
    // }
    // eslint-disable-next-line implicit-arrow-linebreak
    error.response,
);

export default axios;
