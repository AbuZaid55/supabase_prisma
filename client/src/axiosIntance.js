import axios from 'axios'

const axiosIntance  = axios.create({
    baseURL:import.meta.env.VITE_BACKEND_URL
})
export default axiosIntance