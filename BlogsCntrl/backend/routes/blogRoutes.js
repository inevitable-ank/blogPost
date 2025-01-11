const express = require('express');
const {
    createPost,
    getAllPosts,
    getPostById,
    deletePost
} = require('../controllers/blogController');

const { authMiddleware } = require('../middleware/authMiddleware');
const { roleMiddleware } = require('../middleware/roleMiddleware');

const router = express.Router();

// Public Routes for Viewing Posts
router.get('/', getAllPosts);               
router.get('/:id', getPostById);            

// ✅ Protected Routes (Ensure Proper Token Handling)
router.post('/', authMiddleware, roleMiddleware('admin'), createPost);
router.delete('/:id', authMiddleware, roleMiddleware('admin'), deletePost);

module.exports = router;
