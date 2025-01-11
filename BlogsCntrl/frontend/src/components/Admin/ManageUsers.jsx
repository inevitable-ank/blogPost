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
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(response.data);
            } catch (error) {
                alert('Error fetching users');
                console.error('Error:', error);
            }
        };

        fetchUsers();
    }, []);

    const promoteToAdmin = async (id) => {
        const token = localStorage.getItem('token');
        try {
            await axios.patch(`${process.env.REACT_APP_API_URL}/api/admin/promote/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            alert('User promoted to admin successfully!');
            window.location.reload(); // ✅ Refresh user list after promotion
        } catch (error) {
            alert('Error promoting user');
        }
    };

    return (
        <div className="container mx-auto p-10">
            <h2 className="text-3xl font-bold mb-6">Manage Users</h2>
            {users.map((user) => (
                <div key={user._id} className="p-4 border mb-4 rounded-lg shadow">
                    <p><strong>{user.name}</strong> - <em>{user.role}</em></p>
                    {user.role !== 'admin' && (
                        <button
                            onClick={() => promoteToAdmin(user._id)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
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
