import axios from 'axios'

const instance =axios.create({
    baseURL:'http://backend.instaaqar.ikoniks.de/api',

})

export default instance;