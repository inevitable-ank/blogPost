import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const BlogList = () => {
    const [posts, setPosts] = useState([]);
    const { user } = useContext(AuthContext);

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

    return (
        <div className="min-h-screen bg-gray-100 p-10">
            <h1 className="text-4xl font-bold text-center mb-10">All Blog Posts</h1>

            {/* ✅ Only show the create button for admins */}
            {user?.role === 'admin' && (
                <div className="text-center mb-6">
                    <Link to="/create-post" className="bg-blue-500 text-white p-3 rounded-lg">
                        + Create New Post
                    </Link>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.map((post) => (
                    <div key={post._id} className="p-6 bg-white shadow-lg rounded-lg">
                        <h2 className="text-2xl font-bold mb-4">{post.title}</h2>
                        <p className="text-gray-700 mb-4">{post.content.substring(0, 100)}...</p>
                        <Link
                            to={`/blog/${post._id}`}
                            className="text-blue-500 hover:underline"
                        >
                            Read More
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BlogList;
