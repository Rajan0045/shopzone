import axios from "axios";
import { Constants } from "./constant";

const api = axios.create({
    baseURL: Constants.URL,
});

api.interceptors.request.use((config) => {
    const persistedState = localStorage.getItem("persist:root");
    if (persistedState) {
        const rootState = JSON.parse(persistedState);
        const userState = JSON.parse(rootState.user);
        const token = (userState?.user?.token || userState?.user?.user?.token);
        // console.log("TOKEN : ", token);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

export default api;