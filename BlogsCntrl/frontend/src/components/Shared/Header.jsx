import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const Header = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <header className="w-full bg-blue-500 text-white py-4 px-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold"><Link to="/">RBAC Blog Platform</Link></h1>
            <nav className="flex items-center space-x-4">
                <Link to="/" className="hover:underline">Home</Link>

                {user ? (
                    <>
                        {user.role === 'admin' && (
                            <Link to="/admin" className="hover:underline">Admin Dashboard</Link>
                        )}
                        <button 
                            onClick={logout} 
                            className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/login" className="hover:underline">Login</Link>
                        <Link to="/signup" className="hover:underline">Signup</Link>
                    </>
                )}
            </nav>
        </header>
    );
};

export default Header;
