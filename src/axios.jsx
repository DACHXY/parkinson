import axios from 'axios';
import Host from './constant';

export const jsonRequest = axios.create({
  baseURL: Host,
  headers: {
    'Content-Type': 'application/json',
  },
});
// jsonRequest.defaults.timeout = 2500;

export const formDataRequest = axios.create({
  baseURL: Host,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
// formDataRequest.defaults.timeout = 2500;

export const formDataRequestNoAuth = axios.create({
  baseURL: Host,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
formDataRequestNoAuth.defaults.timeout = 10000;
