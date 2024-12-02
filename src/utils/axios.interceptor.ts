import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.interceptors.request.use(
  function (config) {
    config.withCredentials = true;
    const endpoint = config.url;
    const modifyUrl = `${import.meta.env.VITE_BASEURL}${endpoint}`;
    config.url = modifyUrl;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response interceptor
axios.interceptors.response.use(
  function (response) {
    // console.log('Response Data:', response.data);
    return response;
  },
  function (error) {
    // let navigate = useNavigate()
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized! Redirecting to login...");
      localStorage.clear()
      // navigate('/login')
    }
    return Promise.reject(error);
  }
);
