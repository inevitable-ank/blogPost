const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
// const nodemailer = require('nodemailer');

// Signup Controller

// const transporter = nodemailer.createTransport({
//     host: process.env.EMAIL_HOST,
//     port: process.env.EMAIL_PORT,
//     secure: false, 
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//     }
// });

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
            // isVerified: false
        });

        await newUser.save();

        // const verificationToken = jwt.sign(
        //     { email: newUser.email },
        //     process.env.JWT_SECRET,
        //     { expiresIn: '1h' }
        // );
        // const verificationLink = `${req.protocol}://${req.get('host')}/api/auth/verify/${verificationToken}`;
        // await transporter.sendMail({
        //     from: `"Blog Platform" <${process.env.EMAIL_USER}>`,
        //     to: newUser.email,
        //     subject: "Please Verify Your Email",
        //     html: `<h2>Welcome to the Blog Platform</h2>
        //            <p>Please click the link below to verify your account:</p>
        //            <a href="${verificationLink}">Verify Your Email</a>`
        // });

        // res.status(201).json({ message: 'User registered! Please verify your email.' });
        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
};

// const verifyEmail = async (req, res) => {
//     const { token } = req.params;
//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findOne({ email: decoded.email });

//         if (!user) {
//             return res.status(404).json({ message: 'User not found.' });
//         }

//         user.isVerified = true; // ✅ Mark user as verified
//         await user.save();
        
//         res.status(200).send('Email successfully verified! You can now log in.');
//     } catch (error) {
//         res.status(400).json({ message: 'Invalid or expired token.' });
//     }
// };

// Login Controller
const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // if (!user.isVerified) {
        //     return res.status(403).json({ message: 'Please verify your email first.' });
        // }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // ✅ Generate Token with Expiry
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
