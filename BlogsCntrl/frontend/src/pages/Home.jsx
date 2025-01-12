import React from 'react';
import BlogList from '../components/Blog/BlogList';

const Home = () => {
    return (
        // <div className="min-h-screen bg-gray-100">
        //     <h1 className="text-4xl font-bold text-center py-10">Welcome to RBAC Blog Platform</h1>
        //     <BlogList />
        // </div>
        <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 text-center">
        <h1 className="text-6xl font-bold text-blue-600 mb-6">Welcome to the Blog Platform</h1>
        <p className="text-lg text-gray-700 mb-8">Explore insightful blog posts and share your ideas with the world.</p>
        <BlogList />
        {/* <Link
            to="/signup"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
        >
            Get Started
        </Link> */}
    </div>
    );
};

export default Home;
