const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Signup Controller
const signup = async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // ✅ Check for empty fields
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // ✅ Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists.' });
        }

        // ✅ Hash the password
        // const hashedPassword = await bcrypt.hash(password, 10);

        // ✅ Create and save the user
        const newUser = new User({
            name,
            email,
            password, // ✅ Password will be hashed automatically by the model
            role: role || 'user'
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // ✅ Validate inputs
        if (!email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // ✅ Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // ✅ Validate the password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // ✅ Generate a JWT Token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '2h' }
        );

        res.status(200).json({ token, message: 'Login successful!' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

// Token Verification (Optional for testing)
const verifyToken = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ message: 'Token is valid', decoded });
    } catch (error) {
        res.status(401).json({ message: 'Invalid token', error });
    }
};

module.exports = { signup, login, verifyToken };
