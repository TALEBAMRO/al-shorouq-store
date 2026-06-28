import axios from "axios";

const customerAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

customerAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("customerToken");

    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

console.log("API:", import.meta.env.VITE_API_URL);

customerAxios.interceptors.response.use(
    (response) => response, 
    (error) => {
        if (!error.response) {
            return Promise.reject(error);
        }

        if (error.response.status === 401) {
            localStorage.removeItem("customerToken");
            localStorage.removeItem("currentCustomer");

            window.location.href = "/login";
        }

        return Promise.reject(error);
}
);

export default customerAxios;