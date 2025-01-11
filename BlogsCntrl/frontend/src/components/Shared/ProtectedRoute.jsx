import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';

const ProtectedRoute = ({ role, children }) => {
    const { user } = useContext(AuthContext);

    // ✅ Redirect if no user is found
    if (!user) {
        alert('You need to log in first.');
        return <Navigate to="/login" />;
    }

    // ✅ Check for role authorization
    if (role && user.role !== role) {
        alert('Unauthorized access! Only admins can access this page.');
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
