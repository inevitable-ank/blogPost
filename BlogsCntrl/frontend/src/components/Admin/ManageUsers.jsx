import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';

const ManageUsers = () => {
    const [users, setUsers] = useState([]);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        const fetchUsers = async () => {
            const token = localStorage.getItem('token');
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/admin`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setUsers(response.data);
            } catch (error) {
                console.error('Error fetching users:', error);
                alert('Error fetching users. Please try again.');
            }
        };

        fetchUsers();
    }, []);

    const promoteToAdmin = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/api/admin/promote/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            alert('User promoted to admin successfully!');
            // ✅ Refresh the user list after promotion
            setUsers(users.map(user => user._id === id ? { ...user, role: 'admin' } : user));
        } catch (error) {
            alert('Error promoting user. Ensure you have admin privileges.');
        }
    };

    if (user?.role !== 'admin') {
        return <p className="text-red-500 text-center">You do not have permission to view this page.</p>;
    }

    return (
        <div className="container mx-auto p-10">
            <h2 className="text-3xl font-bold mb-6">Manage Users</h2>
            {users.map((user) => (
                <div key={user._id} className="p-4 border mb-4 rounded-lg shadow">
                    <p><strong>Name:</strong> {user.name} | <strong>Email:</strong> {user.email} | <strong>Role:</strong> {user.role}</p>
                    {user.role !== 'admin' && (
                        <button
                            onClick={() => promoteToAdmin(user._id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg mt-2 hover:bg-blue-700"
                        >
                            Promote to Admin
                        </button>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ManageUsers;
