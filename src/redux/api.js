import axios from "axios";

const devEnv = process.env.NODE_ENV !== "production";

const { REACT_APP_DEV_API, REACT_APP_PROD_API } = process.env;

const API = axios.create({
  baseURL: `${devEnv ? REACT_APP_DEV_API : REACT_APP_PROD_API}`,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.Authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const postData = (url, formData) => API.post(url, formData);
