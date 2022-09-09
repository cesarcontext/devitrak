import axios from 'axios'

const devitrackApi = axios.create({
    baseURL: "http://localhost:34001/api"
});

//TODO: config interceptors
devitrackApi.interceptors.request.use( config => {
    config.headers = {
        'x-token' : localStorage.getItem('token')
    }
})



export default devitrackApi