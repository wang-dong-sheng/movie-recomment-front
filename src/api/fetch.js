import api from './index';
import axios from '../http';

const headers = {
  'Content-Type': 'application/json',
  // 这里有一个很玄学的问题
  token: localStorage.getItem('token'),
};
export default {
  getPerson(num) {
    return axios.get(api.getPerson(), { params: { page: num, size: 9 } }, { headers });
  },
  getMovie() {
    return axios.get(api.getMovie(), { params: { size: 12 } }, { headers });
  },
  getRecommend() {
    const info = localStorage.getItem('user');
    return axios.post(api.getRecommend(), info, { headers });
  },
  getMovieHigh() {
    return axios.get(api.getMovieHigh(), { headers });
  },
  getMovieList(info) {
    return axios.post(api.getMovieByTag(), JSON.stringify(info), { headers });
  },
  getMovieInfo(id) {
    return axios.get(api.getMovieInfo(), { params: { movieId: id } }, { headers });
  },
  getCommentList(info) {
    headers.token = localStorage.getItem('token');
    return axios.post(api.getCommentInfo(), JSON.stringify(info), { headers });
  },
  submitComment(info) {
    headers.token = localStorage.getItem('token');
    return axios.post(api.submitComment(), JSON.stringify(info), { headers });
  },
  putMovie(info) {
    headers.token = localStorage.getItem('token');
    return axios.post(api.putMovie(), JSON.stringify(info), { headers });
  },
  getPersonInfo(id) {
    return axios.get(api.getPersonInfo(), { params: { personId: id } }, { headers });
  },
  getPersonMovie(name) {
    return axios.get(api.getPersonMovie(), { params: { personName: name } }, { headers });
  },
  userRegister(info) {
    return axios.post(api.userRegister(), JSON.stringify(info), { headers });
  },
  movieTags() {
    return axios.get(api.getMovieTag(), { headers });
  },
  userLogin(info) {
    return axios.post(api.userLogin(), JSON.stringify(info), { headers });
  },
  getUserInfo(info) {
    return axios.get(api.getUserInfo(), { params: { token: info } }, { headers });
  },
  sendCode(phone) {
    return axios.get(api.sendCode(), { params: { phone } }, { headers });
  },
  logout() {
    headers.token = localStorage.getItem('token');
    return axios.post(api.logout(), null, { headers });
  },
  putUserInfo(userInfo) {
    headers.token = localStorage.getItem('token');
    return axios.post(api.putUserInfo(), JSON.stringify(userInfo), { headers });
  },
  changePhone(phone) {
    return axios.put(api.changePhone(), JSON.stringify(phone), { headers });
  },
  changePass(password) {
    return axios.put(api.changePass(), JSON.stringify(password), { headers });
  },
  getMessage() {
    return axios.get(api.getMessage(), { headers });
  },
};
