import React from 'react';
import BlogList from '../components/Blog/BlogList';

const Home = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-center py-10">Welcome to RBAC Blog Platform</h1>
            <BlogList />
        </div>
    );
};

export default Home;
