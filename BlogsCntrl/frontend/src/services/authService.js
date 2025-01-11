import api from './api';

export const loginUser = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
};

export const signupUser = async (name, email, password) => {
    const response = await api.post('/auth/signup', { name, email, password });
    return response.data;
};

export const verifyToken = async (token) => {
    const response = await api.get('/auth/verify-token', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};
