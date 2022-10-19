import axios from 'axios'

const instance =axios.create({
    baseURL:'http://3.67.189.115/api',

})

export default instance;