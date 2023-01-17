import Axios from "axios";
import useAxios, { configure } from "axios-hooks";
import LRU from "lru-cache";
import { BASE_URL } from "./ApiEndPoints";
const cache = new LRU({ max: 10 });

let axios;
export const getAxios = (token = null) => {
  axios = Axios.create({
    baseURL: BASE_URL,
    timeout: 1500000,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token && token}`,
    },
  });
  configure({ axios, cache });
  axios.interceptors.request.use(
    function (config) {
      // Do something before request is sent
      config.headers["Content-Type"] = "application/json";
      //alert("Token set");
      return config;
    },
    function (error) {
      // Do something with request error
      return Promise.reject(error);
    }
  );
  return axios;
};
// self invoke for first time
getAxios();
export const useAx = (endpoint) => {
  return useAxios(endpoint);
};
