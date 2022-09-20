import axios from 'axios'

const instance =axios.create({
    baseURL:'http://backend.instaaqar.ikoniks.de',

})

export default instance;