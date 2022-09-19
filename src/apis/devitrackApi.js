import axios from "axios";

export const devitrackApi = axios.create({
  baseURL: "http://localhost:34001/api",
});

export const devitrackApiPayment = axios.create({
  baseURL: "http://localhost:34001/api/creditCard",
});

//TODO: config interceptors
devitrackApiPayment.interceptors.request.use((config) => {
  if (localStorage.getItem("token")) {
    config.headers = {
      "x-token": localStorage.getItem("token"),
    };
    console.log('config', config.headers )
  }
  return config
});

export const devitrackApiAdmin = axios.create({
  baseURL: "http://localhost:34001/api/admin"
})

devitrackApiAdmin.interceptors.request.use((config) => {
  if (localStorage.getItem("token")) {
    config.headers = {
      "x-token": localStorage.getItem("token"),
    };
    console.log('config', config.headers )
  }
  return config
});

