import axios from 'axios';


export  const axiosInstance = axios.create({
    baseURL  :'http://localhost:5173'
} )

export default axiosInstance

