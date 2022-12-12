import axios from "axios";

export const devitrackApi = axios.create({
  baseURL: "https://devitrackdb.itmastersltd.com/api",
});

export const devitrackApiPayment = axios.create({
  baseURL: "https://devitrackdb.itmastersltd.com/api/creditCard",
});

//TODO: config interceptors
devitrackApiPayment.interceptors.request.use((config) => {
  if (localStorage.getItem("token")) {
    config.headers = {
      "x-token": localStorage.getItem("token"),
    };
  }
  return config
});

export const devitrackApiAdmin = axios.create({
  baseURL: "https://devitrackdb.itmastersltd.com/api/admin"
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
  baseURL: "https://devitrackdb.itmastersltd.com/api/stripe"
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
  baseURL: "https://devitrackdb.itmastersltd.com/api/article"
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

