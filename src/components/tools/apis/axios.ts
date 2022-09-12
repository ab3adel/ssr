import axios from 'axios'

const instance =axios.create({
    baseURL:'http://139.59.130.187/api/',

})

export default instance;