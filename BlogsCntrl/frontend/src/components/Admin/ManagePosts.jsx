import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManagePosts = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts`);
                setPosts(response.data);
            } catch (error) {
                console.error('Error fetching posts:', error);
            }
        };
        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        const token = localStorage.getItem('token');  // ✅ Token Added
        if (!token) {
            alert('You are not authorized. Please login again.');
            return;
        }

        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                await axios.delete(`${process.env.REACT_APP_API_URL}/api/posts/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`  // ✅ Token Sent Correctly
                    }
                });
                setPosts(posts.filter(post => post._id !== id));
                alert('Post deleted successfully!');
            } catch (error) {
                alert('Failed to delete the post. Ensure you have admin rights.');
                console.error('Error:', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <h2 className="text-3xl font-bold mb-6 text-center">Manage Posts</h2>
            <ul className="space-y-6">
                {posts.map((post) => (
                    <li key={post._id} className="p-4 bg-white shadow-md rounded-lg flex justify-between items-center">
                        <div>
                            <h3 className="text-xl font-bold">{post.title}</h3>
                            <p>{post.content}</p>
                            <p className="text-sm text-gray-600">Author: {post.author}</p>
                        </div>
                        <div className="space-x-4">
                            <button 
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                                onClick={() => handleDelete(post._id)}
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ManagePosts;
