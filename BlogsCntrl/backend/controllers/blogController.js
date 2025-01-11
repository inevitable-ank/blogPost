const Blog = require('../models/Blog');

// Create a New Blog Post (Admin Only)
const createPost = async (req, res) => {
    const { title, content } = req.body;

    try {
        // ✅ Extract the author from the authenticated user
        const author = req.user.id;

        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required.' });
        }

        const newPost = new Blog({
            title,
            content,
            author
        });

        await newPost.save();
        res.status(201).json({ message: 'Blog post created successfully!' });
    } catch (error) {
        res.status(500).json({ message: 'Error creating blog post', error });
    }
};

// Get All Blog Posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts', error });
    }
};

// Get a Single Blog Post by ID
const getPostById = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Blog.findById(id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching the post', error });
    }
};

// Delete a Blog Post (Admin Only)
const deletePost = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedPost = await Blog.findByIdAndDelete(id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json({ message: 'Post deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting the post', error });
    }
};

module.exports = { createPost, getAllPosts, getPostById, deletePost };
