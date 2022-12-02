import axios from 'axios';
import Host from './constant';

export const jsonRequest = axios.create({
  baseURL: Host,
  header: { 'Content-Type': 'application/json' },
});

export const formDataRequest = axios.create({
  baseURL: Host,
  header: { 'Content-Type': 'multipart/form-data' },
});
