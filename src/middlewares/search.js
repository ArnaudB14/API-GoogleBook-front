import axios from 'axios';

const API_URL = "https://www.googleapis.com/auth/books";

axios.get(`${API_URL}`)
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error(error);
    })