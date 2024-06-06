import axios from "axios";

const roles = Object.freeze({
  USER: 'user',
  ADMIN: 'admin',
  HR : 'HR'
});

function createAxiosInstance(tokenId: string | null, role: string | null) {
  const instance = axios.create({
    // baseURL: 'https://job-hub.online'
    baseURL: "http://localhost:3000",
  });

  if (tokenId) {

    instance.interceptors.request.use(
      (config) => {
      config.headers = Object.assign({
        Authorization: `Bearer ${localStorage.getItem(tokenId)}`,
        role: role,
      }, config.headers);
      return config;
    },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
  return instance;
}

const axiosUserInstance = createAxiosInstance("userToken", roles.USER);
const axiosHRInstance =  createAxiosInstance("HRToken", roles.HR);
const axiosAdminInstance = createAxiosInstance("adminToken", roles.ADMIN);
const axiosInstance = createAxiosInstance(null, null);

export {
  axiosUserInstance,
  axiosHRInstance,
  axiosAdminInstance,
  axiosInstance,
};
