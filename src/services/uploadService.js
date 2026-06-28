import axiosInstance from "./axiosInstance";

const API_URL = "/upload";

export const uploadImage = async (file) => {
    const formData = new FormData();

    formData.append("image", file);

    const response = await axiosInstance.post(
        API_URL, 
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data.imageUrl;
};