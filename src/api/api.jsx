import axios from "axios";
const AxiosInstance = axios.create({
  baseURL:
    process.env.REACT_APP_MODE === "production"
      ? process.env.REACT_APP_API
      : process.env.REACT_APP_API_LOCAL,
});

AxiosInstance.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem("jwttoken");
    if (jwtToken) {
      config.headers["Authorization"] = `Bearer ${jwtToken}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default AxiosInstance;
