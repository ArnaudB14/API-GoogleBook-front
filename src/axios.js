import Axios from 'axios'
console.log(process.env.REACT_APP_API_URL)
const axios = Axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,
})

export default axios