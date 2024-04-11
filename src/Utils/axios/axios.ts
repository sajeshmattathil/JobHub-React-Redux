import axios from "axios";

function createAxiosInstance(tokenId: string | null, role: string | null) {
  const instance = axios.create({
    // baseURL: 'https://job-hub.online'
    baseURL: "http://localhost:3000",
  });

  if (tokenId) {
console.log(tokenId,'token')

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
const axiosUserInstance = createAxiosInstance("userToken", "user");
const axiosHRInstance =  createAxiosInstance("HRToken", "HR");
const axiosAdminInstance = createAxiosInstance("adminToken", "admin");
const axiosInstance = createAxiosInstance(null, null);

export {
  axiosUserInstance,
  axiosHRInstance,
  axiosAdminInstance,
  axiosInstance,
};
