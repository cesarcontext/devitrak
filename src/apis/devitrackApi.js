/**

Axios instance for accessing Devitrack API.
@type {Object}
@property {Object} devitrackApi - Instance for general API requests.
@property {Object} devitrackApiAdmin - Instance for API requests with admin access.
@property {Object} devitrackApiStripe - Instance for API requests related to Stripe.
@property {Object} devitrackApiArticle - Instance for API requests related to articles.
*/
import axios from "axios";

export const devitrackApi = axios.create({
  baseURL: process.env.REACT_APP_URL,
});


export const devitrackApiAdmin = axios.create({
  baseURL: `${process.env.REACT_APP_URL}/admin`
})

/**

Configures interceptors for requests to the devitrackApiAdmin instance.
@function
@param {Object} config - The configuration object for the request.
@returns {Object} - The modified configuration object with authentication headers if the user is an admin.
*/
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

/**

Configures interceptors for requests to the devitrackApiStripe instance.
@function
@param {Object} config - The configuration object for the request.
@returns {Object} - The modified configuration object with authentication headers if the user has a token.
*/
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
/**

Configures interceptors for requests to the devitrackApiArticle instance.
@function
@param {Object} config - The configuration object for the request.
@returns {Object} - The modified configuration object with authentication headers if the user is an admin.
*/


//TODO: config interceptors
devitrackApiArticle.interceptors.request.use((config) => {
  if (localStorage.getItem("admin-token")) {
    config.headers = {
      "x-token": localStorage.getItem("admin-token"),
    };
  }
  return config
});

