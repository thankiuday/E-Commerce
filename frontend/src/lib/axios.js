import axios from 'axios';
const axiousInstance = axios.create({
    baseURL:import.meta.mode ===  "development" ? 'http://localhost:5000/api':"/api",
    withCredentials:true, // allow us to send cookies

})
export default axiousInstance;