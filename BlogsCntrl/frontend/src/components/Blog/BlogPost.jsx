import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogPost = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/posts/${id}`);
                setPost(response.data);
            } catch (error) {
                console.error('Error fetching post:', error);
            }
        };
        fetchPost();
    }, [id]);

    if (!post) {
        return <p className="text-center text-red-500">Loading post...</p>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-10">
            <div className="max-w-3xl bg-white shadow-lg rounded-lg p-8">
                <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
                <p className="text-gray-700 mb-6">{post.content}</p>
                <p className="text-sm text-gray-500">Author: {post.author}</p>
            </div>
        </div>
    );
};

export default BlogPost;
