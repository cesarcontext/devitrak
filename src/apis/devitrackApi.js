import axios from 'axios'

const devitrackApi = axios.create({
    baseURL: "http://localhost:4444/api"
});

//TODO: config interceptors




export default devitrackApi