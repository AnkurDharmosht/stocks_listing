import Axios from "axios";
import useAxios, { configure } from "axios-hooks";
import LRU from "lru-cache";
import { BASE_URL } from "./ApiEndPoints";
const cache = new LRU({ max: 10 });

let axios;
export const getAxios = (token = null) => {
  if (!token) {
    // console.log("law axios..");
    // console.log("law setting token..");
    // console.log("law token=>", token);
    token = localStorage.getItem("access_token");
  }
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
export const noAuthGet = (endpoint, setIsProgress, onSuccess, onError) => {
  if (setIsProgress) setIsProgress(true);
  axios
    .get(endpoint, "", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `null`,
      },
    })
    .then((response) => {
      const data = response;
      onSuccess(data);
      if (setIsProgress) setIsProgress(false);
    })
    .catch((error) => {
      if (setIsProgress) setIsProgress(false);
    });
};
