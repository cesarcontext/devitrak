import axios from 'axios'
import { getEnvVariables } from '../helper/getEnvVariables'

const { REACT_APP_URL } = getEnvVariables()

const devitrackApi = axios.create({
    baseURL: REACT_APP_URL
});

//TODO: config interceptors




export default devitrackApi