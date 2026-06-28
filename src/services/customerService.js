import customerAxios from "./customerAxios";

const API_URL = "/customers";

export const registerCustomer = async (customerData) => {
    const response = await customerAxios.post(
        `${API_URL}/register`, 
        customerData
    );
    return response.data;
};

export const loginCustomer = async (email, password) => {
    const response = await customerAxios.post(
        `${API_URL}/login`,
        {
            email,
            password
        }
    );

    return response.data;
};