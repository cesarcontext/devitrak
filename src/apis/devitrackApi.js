import axios from "axios";

export const devitrackApi = axios.create({
  baseURL: process.env.REACT_APP_URL,
});

export const devitrackApiAdmin = axios.create({
  baseURL: `${process.env.REACT_APP_URL}/admin`
})

devitrackApiAdmin.interceptors.request.use((config) => {
  if (localStorage.getItem("admin-token")) {
    config.headers = {
      "x-token": localStorage.getItem("admin-token"),
    };
  }
  return config
});

export const devitrackApiStripe = axios.create({
  baseURL: `${process.env.REACT_APP_URL}/stripe`
})

//TODO: config interceptors
devitrackApiStripe.interceptors.request.use((config) => {
  if (localStorage.getItem("token")) {
    config.headers = {
      "x-token": localStorage.getItem("token"),
    };
  }
  return config
});

export const devitrackApiArticle = axios.create({
  baseURL: `${process.env.REACT_APP_URL}/article`
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

