import axios from "axios";
export const API = axios.create({baseURL: "http://localhost:3001/"});

API.interceptors.request.use(config=>{
    config.headers["Authorization"] = localStorage.getItem("token") ?? ""
    return config
}, error => {
    return Promise.reject(error);
  })