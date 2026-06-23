import axios from "axios";

const API_URL = "http://localhost:5000/api/customers";

export const registerCustomer = async (customerData) => {
    const response = await axios.post(
        `${API_URL}/register`, customerData
    );
    return response.data;
};

export const loginCustomer = async (email, password) => {
    const response = await axios.post(
        `${API_URL}/login`,
        {
            email,
            password
        }
    );

    return response.data.data;
};