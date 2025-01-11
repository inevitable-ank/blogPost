const express = require('express');
const { promoteUserToAdmin, getAllUsers } = require('../controllers/adminController');
const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

const router = express.Router();

// ✅ Promote User to Admin (Admin Only)
router.patch('/promote/:id', authMiddleware, roleMiddleware('admin'), promoteUserToAdmin);

// ✅ Fetch All Users (Admin Only)
router.get('/', authMiddleware, roleMiddleware('admin'), getAllUsers);

module.exports = router;
