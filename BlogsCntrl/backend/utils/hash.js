const bcrypt = require('bcryptjs');

// Hash a password
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

// Compare a provided password with a stored hash
const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

module.exports = { hashPassword, comparePassword };
