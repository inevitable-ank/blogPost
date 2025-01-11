const roleMiddleware = (requiredRole) => {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ message: 'Forbidden: Insufficient privileges.' });
        }
        next();
    };
};

module.exports = { roleMiddleware };
