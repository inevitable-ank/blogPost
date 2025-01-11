import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const CreatePost = () => {
    const [post, setPost] = useState({ title: '', content: '' });
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // ✅ Ensure admin role before submitting
        if (user?.role !== 'admin') {
            alert('Only admins can create posts.');
            return;
        }

        try {
            const token = localStorage.getItem('token');  // ✅ Token added here
            await axios.post(`${process.env.REACT_APP_API_URL}/api/posts`, post, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('Post created successfully!');
            navigate('/');
        } catch (error) {
            alert('Failed to create the post.');
            console.error('Error:', error);
        }
    };

    // ✅ Restrict page for non-admin users
    if (user?.role !== 'admin') {
        return <p className="text-center text-red-500">You do not have permission to create posts.</p>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <form onSubmit={handleSubmit} className="w-96 p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold mb-6 text-center">Create New Post</h2>

                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={post.title}
                    onChange={handleChange}
                    required
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                />

                <textarea
                    name="content"
                    placeholder="Content"
                    value={post.content}
                    onChange={handleChange}
                    required
                    className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
                />

                <button
                    type="submit"
                    className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600"
                >
                    Create Post
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
