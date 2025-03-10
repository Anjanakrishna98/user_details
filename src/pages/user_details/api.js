import axios from 'axios';

const API_URL = 'http://localhost:5000/users';

export const fetchUsers = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

export const createUser = async (userData) => {
    const response = await axios.post(API_URL, userData);
    return response.data;
};

export const updateUser = async (userId, updatedData) => {
    const response = await axios.put(`${API_URL}/${userId}`, updatedData);
    return response.data;
};
