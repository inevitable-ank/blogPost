import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                
                if (decodedToken.exp * 1000 < Date.now()) {
                    console.warn("Token expired, logging out.");
                    localStorage.removeItem('token');
                    setUser(null);
                } else {
                    setUser(decodedToken);
                }
            } catch (error) {
                console.error("Invalid token detected.");
                localStorage.removeItem('token');
                setUser(null);
            }
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('token', token);
        try {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
        } catch (error) {
            console.error("Error decoding token during login.");
            localStorage.removeItem('token');
            setUser(null);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    // ✅ Add a Method to Refresh User State Manually (After Role Change)
    const refreshUser = () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                setUser(decodedToken);
            } catch (error) {
                console.error("Error refreshing user data.");
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, refreshUser }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
