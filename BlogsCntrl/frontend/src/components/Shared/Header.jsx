// src/components/Shared/Navbar.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <nav className="bg-blue-600 text-white p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold hover:text-blue-300">Blog Platform</Link>
                <div className="flex space-x-4">
                    {user ? (
                        <>
                            {user.role === 'admin' && (
                                <Link to="/admin" className="px-4 py-2 bg-green-500 rounded-lg hover:bg-green-400">
                                    Admin Dashboard
                                </Link>
                            )}
                            <button
                                onClick={logout}
                                className="px-4 py-2 bg-red-500 rounded-lg hover:bg-red-400"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="px-4 py-2 bg-blue-500 rounded-lg hover:bg-blue-400">
                                Login
                            </Link>
                            <Link to="/signup" className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-500">
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
