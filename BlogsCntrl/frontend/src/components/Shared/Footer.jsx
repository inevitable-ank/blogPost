import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full bg-gray-800 text-white py-4 text-center">
            <p>© {new Date().getFullYear()} RBAC Blog Platform. All Rights Reserved.</p>
        </footer>
    );
};

export default Footer;
