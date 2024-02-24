import axios from 'axios';

function createAxiosInstance(token : string | null,role : string | null) {
    const instance = axios.create({
        baseURL: 'http://localhost:3000'
    });
    console.log(token,role,'token---role');
    
if(token){
    instance.interceptors.request.use(
        (config) => {
            config.headers.Authorization = `Bearer ${token}`;
            config.headers.role = role;
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );
}
   

    return instance;
}

const HRToken : string | null= localStorage.getItem('HRToken');
const userToken : string | null = localStorage.getItem('userToken');
const adminToken : string | null = localStorage.getItem('adminToken');

const axiosUserInstance = createAxiosInstance(userToken , 'user');
const axiosHRInstance = createAxiosInstance(HRToken , 'HR');
const axiosAdminInstance = createAxiosInstance(adminToken , 'admin');
const axiosInstance = createAxiosInstance(null , null)

export {
    axiosUserInstance,
    axiosHRInstance,
    axiosAdminInstance,
    axiosInstance
};
