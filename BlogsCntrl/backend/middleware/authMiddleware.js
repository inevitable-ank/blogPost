const jwt = require('jsonwebtoken');

// JWT Authentication Middleware with Expiry Check
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized: No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // ✅ Check Token Expiry on Backend
        if (decoded.exp * 1000 < Date.now()) {
            return res.status(401).json({ message: 'Token has expired.' });
        }

        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized: Invalid token.' });
    }
};

module.exports = { authMiddleware };
