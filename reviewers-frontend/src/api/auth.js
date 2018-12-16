import { fetchData } from '../utils/http';
import { BASE_API_URL } from './const';

const BASE_AUTH_API_URL = BASE_API_URL + '/auth';

export const login = (data) => {
  return fetchData(BASE_AUTH_API_URL + '/login', 'POST', data);
};

export const join = () => {

};

export const logout = () => {

};