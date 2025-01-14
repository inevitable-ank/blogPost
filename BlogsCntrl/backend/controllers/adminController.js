const User = require('../models/User');

// ✅ Promote a User to Admin
const promoteUserToAdmin = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // ✅ Prevent Double Admin Promotion
        if (user.role === 'admin') {
            return res.status(400).json({ message: 'User is already an admin.' });
        }

        user.role = 'admin';
        await user.save();
        res.status(200).json({ message: `${user.name} has been promoted to Admin!` });
    } catch (error) {
        res.status(500).json({ message: 'Error promoting user to admin.', error });
    }
};

// ✅ Fetch All Users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}, { name: 1, email: 1, role: 1 });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users.', error });
    }
};

module.exports = { promoteUserToAdmin, getAllUsers };
