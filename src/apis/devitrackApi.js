import axios from "axios";

//*replace link

export const devitrackApi = axios.create({
  baseURL: "https://tracker-backend-file.netlify.app/api",
});

export const devitrackApiPayment = axios.create({
  baseURL: "https://tracker-backend-file.netlify.app/api/creditCard",
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
  baseURL: "https://tracker-backend-file.netlify.app/api/admin"
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
  baseURL: "https://tracker-backend-file.netlify.app/api/stripe"
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
  baseURL: "https://tracker-backend-file.netlify.app/api/article"
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

