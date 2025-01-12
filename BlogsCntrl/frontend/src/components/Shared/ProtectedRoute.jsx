import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const ProtectedRoute = ({ role, children }) => {
    const { user } = useContext(AuthContext);

    // ✅ Ensure Token and Role Check
    const token = localStorage.getItem('token');
    if (!token) {
        alert('You need to log in first.');
        return <Navigate to="/login" />;
    }

    try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
            alert('Session expired! Please log in again.');
            localStorage.removeItem('token');
            return <Navigate to="/login" />;
        }
    } catch (error) {
        alert('Invalid token detected. Please log in again.');
        localStorage.removeItem('token');
        return <Navigate to="/login" />;
    }

    if (role && user.role !== role) {
        alert('Unauthorized access! Only admins can access this page.');
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
