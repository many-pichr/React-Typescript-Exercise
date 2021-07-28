import axios, { AxiosInstance } from "axios";
import config from "../utils/config";
const apiClient: AxiosInstance = axios.create({
  baseURL: config.url,
  headers: {
    "Content-type": "application/json",
    "Authorization":"token "+config.token
  },
});
export default apiClient;
