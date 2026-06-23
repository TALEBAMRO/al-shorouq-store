import axios from "axios";

const API_URL = "http://localhost:5000/api/orders";

export const createOrder = async (orderData) => {
    const response = await axios.post(API_URL, orderData);
    return response.data;
};

export const getOrders = async () => {
    const response = await axios.get(API_URL);
    return response.data.data;
};

export const deleteOrder = async (id) => {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
}

export const getOrderById = async (id) => {
    const response = await axios.get(
        `${API_URL}/${id}`
    );
    return response.data.data;
};

export const updateOrderStatus = async (id, status) => {
    const response = await axios.put(
        `${API_URL}/${id}`, {status}
    );

    return response.data
};

export const getOrderByCustomer = async (email) => {
    const response = await axios.get(
        `${API_URL}/customer/${email}`
    );

    return response.data.data;
};