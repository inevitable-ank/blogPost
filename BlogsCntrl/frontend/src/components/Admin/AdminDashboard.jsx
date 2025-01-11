import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-10">
            <h1 className="text-4xl font-bold mb-6 text-center text-blue-600">Admin Dashboard</h1>
            
            <div className="flex space-x-4">
                <Link 
                    to="/admin/create-post" 
                    className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600"
                >
                    Create New Post
                </Link>

                <Link 
                    to="/admin/manage-posts" 
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                    Manage Posts
                </Link>
            </div>
        </div>
    );
};

export default AdminDashboard;
