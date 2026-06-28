import axios from "./axiosInstance";

const API_URL = "/admin";

export const adminLogin = async (email, password) => {
    const response = await axios.post(`${API_URL}/login`, {
        email,
        password,
    });

    return response.data;
};
