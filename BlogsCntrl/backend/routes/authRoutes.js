const express = require('express');
const { signup, login, verifyToken } = require('../controllers/authController');

const router = express.Router();

// Public Routes for Authentication
router.post('/signup', signup);   // User registration
router.post('/login', login);     // User login
router.get('/verify-token', verifyToken);  // Optional token verification for testing

module.exports = router;
