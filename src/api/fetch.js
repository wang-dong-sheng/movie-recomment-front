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
  // 基于人的推荐
  getRecommend(recommendVo) {

    return axios.post(api.getRecommend(), recommendVo, { headers });
  },
  // 基于物品的推荐
  getRecommendByMovieId(recommendVo) {

    return axios.post(api.getRecommendByMovieId(), recommendVo, { headers });
  },
  // 混合推荐
  getHybridRecommendations(recommendVo) {
    return axios.post(api.getHybridRecommendations(), recommendVo, { headers });
  },
  // 实时推荐算
  getCurrentTimeMovies(recommendVo) {
    return axios.post(api.getCurrentTimeMovies(), recommendVo, { headers });
  },
  //评分数最多推荐
  getRateMoreMovies(recommendVo){
    return axios.post(api.getRateMoreMovies(), recommendVo, { headers });
  },
  // 热门推荐
  getHotMovies(recommendVo){
    return axios.post(api.getHotMovies(), recommendVo, { headers });
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
  filterMovies(movieQueryRequest){
    return   axios.post(api.filterMovies(), movieQueryRequest,{ headers });
  },
  deleteMovies(ids){
    return  axios.delete(api.deleteMovies(), {
      data: ids,  // 将 ID 列表作为请求体发送
      headers
    });
  },
  upOrDownMovies(movieUpVo){
    return   axios.post(api.upOrDownMovies(), movieUpVo,{ headers });
  },
  //新增电影
  addMovie(movie){
    return   axios.post(api.addMovie(), movie,{ headers });
  },
  //修改movie
  updateMovie(movie){
    return   axios.post(api.updateMovie(), movie,{ headers });
  },
  getCommentList(info) {
    headers.token = localStorage.getItem('token');
    return axios.post(api.getCommentInfo(), JSON.stringify(info), { headers });
  },
  submitComment(info) {
    headers.token = localStorage.getItem('token');
    return axios.post(api.submitComment(), JSON.stringify(info), { headers });
  },
  deleteComments(ids) {
    return axios.delete(api.deleteComments(), {
      data: ids,  // 将 ID 列表作为请求体发送
      headers
    });
  },
  //打分
  setRating(info) {
    headers.token = localStorage.getItem('token');
    return axios.post(api.setRating(), JSON.stringify(info), { headers });
  },
  //获取打分
  getRating(info) {
    headers.token = localStorage.getItem('token');
    return axios.post(api.getRating(), JSON.stringify(info), { headers });
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
  updateUserInfo(info) {
    return axios.post(api.updateUserInfo(), JSON.stringify(info), { headers });
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
  getAllUser(){
    return axios.get(api.getAllUser(),{headers})
  },
  deleteUsers(ids) {
    return axios.delete(api.deleteUsers(), {
      data: ids,  // 将 ID 列表作为请求体发送
      headers
    });
  },
  filterUsers(userQueryRequest) {
    return axios.post(api.filterUsers(), userQueryRequest,{ headers });
  },
};
