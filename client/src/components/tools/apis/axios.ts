import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://backend.instaaqar.com/api',


})

export default instance;