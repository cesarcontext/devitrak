import axios from 'axios'
import { getEnvVariables } from '../helper/getEnvVariables'

const { REACT_APP_URL } = getEnvVariables()

console.log( REACT_APP_URL )

const devitrackApi = axios.create({
    baseURL: REACT_APP_URL
});

//TODO: config interceptors




export default devitrackApi