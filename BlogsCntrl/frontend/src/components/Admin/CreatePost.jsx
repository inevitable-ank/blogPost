import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = () => {
    const [post, setPost] = useState({
        title: '',
        content: '',
        author: '',
    });

    const handleChange = (e) => {
        setPost({ ...post, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/api/posts`, post);
            alert('Post created successfully!');
        } catch (error) {
            alert('Failed to create the post.');
        }
    };

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

                <input
                    type="text"
                    name="author"
                    placeholder="Author Name"
                    value={post.author}
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
