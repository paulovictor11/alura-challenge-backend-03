import axios from "axios";

const baseUrl = axios.create({
    baseURL: 'http://localhost:3000/api'
});

export default baseUrl;