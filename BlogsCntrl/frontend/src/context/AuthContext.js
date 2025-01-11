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

                // ✅ Token Expiry Check Added
                if (decodedToken.exp * 1000 < Date.now()) {
                    console.warn("Token expired. Logging out.");
                    localStorage.removeItem('token');
                    setUser(null);
                } else {
                    setUser(decodedToken);
                }
            } catch (error) {
                console.error("Invalid token detected, logging out user.");
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
            console.error('Failed to decode token.');
            setUser(null);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
