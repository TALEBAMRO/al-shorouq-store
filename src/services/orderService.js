import axiosInstance from "./axiosInstance";
import customerAxios from "./customerAxios";

const API_URL = "/orders";

//Customer

export const createOrder = async (orderData) => {
    const response = await customerAxios.post(API_URL, orderData);
    return response.data;
};

export const getOrderByCustomer = async () => {
    const response = await customerAxios.get(`${API_URL}/customer`);
    return response.data.data;
};

//Admin

export const getOrders = async () => {
    const response = await axiosInstance.get(API_URL);
    return response.data.data;
};

export const getOrderById = async (id) => {
    const response = await axiosInstance.get(
        `${API_URL}/${id}`
    );
    return response.data.data;
};

export const updateOrderStatus = async (id, status) => {
    const response = await axiosInstance.put(
        `${API_URL}/${id}`, {status}
    );

    return response.data;
};

export const deleteOrder = async (id) => {
    const response = await axiosInstance.delete(`${API_URL}/${id}`);
    return response.data;
};