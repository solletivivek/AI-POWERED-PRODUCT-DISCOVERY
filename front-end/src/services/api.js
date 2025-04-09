import axios from 'axios';

const API_URL = "http://localhost:5000";

export const searchProducts = async (query) => {
    const response = await axios.post(`${API_URL}/api/products/search`, { query });
    return response.data;
};
