import axios from "axios";

// use this api instance of axios so that you dont have to type base url all the time
// and also you can change here so that url is changed all over incase of development and production backend

const _baseUrl = "http://localhost:5000";
const baseApi = axios.create({
  baseURL: _baseUrl,
  // withCredentials: true,
  // headers: {
  //   "Access-Control-Allow-Credentials": "true",
  // },
});
export default baseApi;
export { _baseUrl };
