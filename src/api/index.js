const host = 'http://127.0.0.1:10015';
// const host = 'http://localhost:10000'

export default {
  userRegister() {
    return `${host}/user/register`;
  },
  userLogin() {
    return `${host}/user/login`;
  },
  getUserInfo() {
    return `${host}/user/userInfo`;
  },
  getAllUser(){
    return `${host}/user/getAllUser`;
  },
  filterUsers(){
    return `${host}/user/filterUsers`;
  },
  deleteUsers(){
    return `${host}/user/deleteUsers`;
  },
  getMovie() {
    return `${host}/movie/list`;
  },
  getRecommend() {
    return `${host}/movie/recommend`;
  },
  getMovieHigh() {
    return `${host}/movie/high`;
  },
  getMovieByTag() {
    return `${host}/movie/listByTag`;
  },
  getMovieInfo() {
    return `${host}/movie/info`;
  },
  getCommentInfo() {
    return `${host}/comment/list`;
  },
  deleteComments() {
    return `${host}/comment/deleteComments`;
  },
  submitComment() {
    return `${host}/comment/submit`;
  },
  putMovie() {
    return `${host}/movie/update`;
  },
  getPerson() {
    return `${host}/person/list`;
  },
  getPersonInfo() {
    return `${host}/person/info`;
  },
  getPersonMovie() {
    return `${host}/movie/person/attend`;
  },
  getMovieTag() {
    return `${host}/movie/tag`;
  },
  filterMovies(){
    return `${host}/movie/filterMovies`;
  },
  deleteMovies(){
    return `${host}/movie/deleteMovies`;
  },
  //上映或下架电影
  upOrDownMovies(){
    return `${host}/movie/isUp`;
  },
  addMovie(){
    return `${host}/movie/addMovie`;
  },
  updateMovie(){
    return `${host}/movie/updateMovie`;
  },
  sendCode() {
    return `${host}/user/code`;
  },
  logout() {
    return `${host}/user/logout`;
  },
  // 提交用户信息
  putUserInfo() {
    return `${host}/user/userInfo`;
  },
  // 修改用户手机号码
  changePhone() {
    return `${host}/user/phone`;
  },
  // 修改用户密码
  changePass() {
    return `${host}/user/password`;
  },
  // 修改用户邮箱
  changeEmail() {
    return `${host}/user/email`;
  },
  getMessage() {
    return `${host}/message/user/get`;
  },
};
