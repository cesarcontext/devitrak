import axios from "axios";

const api = process.env.REACT_APP_DEVITRACK_API
export const devitrackApi = axios.create({
  baseURL:api,
});

export const devitrackApiAdmin = axios.create({
  baseURL: `${api}/admin`
})

devitrackApiAdmin.interceptors.request.use((config) => {
  if (localStorage.getItem("admin-token")) {
    config.headers = {
      "x-token": localStorage.getItem("admin-token"),
    };
  }
  return config
});

export const devitrackApiArticle = axios.create({
  baseURL: `${api}/article`
})

//TODO: config interceptors
devitrackApiArticle.interceptors.request.use((config) => {
  if (localStorage.getItem("admin-token")) {
    config.headers = {
      "x-token": localStorage.getItem("admin-token"),
    };
  }
  return config
});

