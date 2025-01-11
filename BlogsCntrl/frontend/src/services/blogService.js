import api from './api';

export const fetchPosts = async () => {
    const response = await api.get('/posts');
    return response.data;
};

export const getPostById = async (id) => {
    const response = await api.get(`/posts/${id}`);
    return response.data;
};

export const createPost = async (post) => {
    const token = localStorage.getItem('token');
    const response = await api.post('/posts', post, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export const deletePost = async (id) => {
    const token = localStorage.getItem('token');
    await api.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
