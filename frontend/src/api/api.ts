import axios from "axios";
import { IUser } from "../interfaces/IUser";
import { baseURL } from "../utils/constants";

export const api = axios.create({
  baseURL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("token");
  return config;
});

api.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalReq = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalReq._isRetry = true;
      try {
        const res = await axios.get<IUser>(`${baseURL}/refresh`, {
          withCredentials: true,
        });
        localStorage.setItem("token", res.data.token);
        return api.request(originalReq);
      } catch (e) {
        console.log("Not authorized");
      }
    }
    throw error;
  }
);
