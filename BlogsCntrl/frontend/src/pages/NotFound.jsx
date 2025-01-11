import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-6xl font-bold text-red-500 mb-6">404</h1>
            <p className="text-2xl font-semibold mb-4">Oops! Page Not Found</p>
            <Link to="/" className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                Go Back Home
            </Link>
        </div>
    );
};

export default NotFound;
